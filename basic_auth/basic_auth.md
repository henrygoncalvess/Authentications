``` javascript
const express = require('express');
const app = express()

// Middleware para autenticação básica
function basicAuth(req, res, next){
    // captura o header com o valor de 'authoritation'
    const authHeader = req.headers['authorization']

    // verifica se existe uma string base64 no Header dentro de "Authorization"
    if (!authHeader){
        res.status(401).send('autorização necessária')
    }

    // separada o valor da string base64 da palavra "Basic" de "Basic str1ngC0d1f1c4d4="
    const base64Credentials = authHeader.split(' ')[1]

    // decodifica o valor da string base64 para texto -> 'toString()'
    const credentials = Buffer.from(base64Credentials, 'base64').toString()

    // com a string decodificada no formato username:password,
    // dividimos usando split(':'). Isso separa o nome de usuário da senha,
    // armazenando-os nas variáveis username e password.
    const [username, password] = credentials.split(':')

    // Aqui estamos validando se o nome de usuário e a senha decodificada são exatamente
    // iguais a "teste" e "123". Se sim, significa que as credenciais estão corretas.
    if (username === 'teste' && password === '123'){
        next()
    }else{
        res.status(401).send('credenciais incorretas')
    }
}

// aplicando o middleware para fazer a verificação antes de enviar uma resposta
app.get('/basic-auth', basicAuth, (req, res) => {
    res.send('autenticado')
})

app.listen(3000, () => {
    console.log('rodando');
})
```

<br>

## Instrução de uso

Inicie o servidor local

`repositorios\clonados\Authentications\basic_auth`
``` bash
node app.js
```

teste as respostas da autenticação seguindo o **endpoint** abaixo.

<br>

Rota | Descrição
--- | :---:
***GET*** ` http://localhost:3000/basic-auth ` | autentica o usuário se o nome e senha codificados estiverem corretos

***Request***

`headers`
``` json
{
    "Authorization": "Basic dGVzdGU6MTIz"
}
```

***Response***

``` bash
autenticado
```

### Considerações

Basic Authentication (`Basic Auth`) é um método simples de autenticação HTTP que requer o envio de credenciais  
(_normalmente nome de usuário e senha_) **codificadas em Base64** no Header da requisição.  
Essas credenciais são enviadas em todas as requisições para verificar a identidade do cliente.

#### Fluxo de Autenticação
1. **Requisição inicial:** O cliente faz uma requisição HTTP e envia as credenciais no Header `Authorization`.  
2. **Verificação das credenciais:** O servidor verifica se as credenciais fornecidas são válidas.  
3. **Resposta do servidor:**
    - *200 OK:* Se as credenciais estiverem corretas, o servidor responde com o recurso solicitado.
    - *401 Unauthorized:* Se as credenciais estiverem incorretas ou ausentes, o servidor retorna um status 401.

#### Quando usar?
- API simples
- Autenticação temporária

#### Limitações
- **Transmissão dos dados:** Tanto API Keys quanto Basic Auth são inseguros se transmitidos sem HTTPS,  
pois os dados podem ser facilmente interceptados e usados por um atacante.
- **Dificuldade de revogação:** Não é fácil revogar ou rotacionar credenciais sem exigir que o usuário altere a senha.
- **Não oferece autorização:** Basic Auth é apenas um mecanismo de autenticação,  
ele não lida com permissões e controle de acesso.
