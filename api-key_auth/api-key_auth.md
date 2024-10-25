``` javascript
const express = require("express")
const crypto = require("crypto")
const app = express()

// função que gera uma chave api aleatória
function generateApiKey() {
    return crypto.randomBytes(32).toString("hex")
}

// simulação de um usuário que se cadastrou e recebeu uma chave aleatória
// e essa chave foi guardada no banco de dados
const randomApiKey = generateApiKey()

// middleware de autenticação por API key
function authApiKey(req, res, next) {
    // captura o header com o valor de 'authoritation'
    const authHeader = req.headers["authorization"]

    // verifica se existe uma chave no Header dentro de "Authorization"
    if (!authHeader) {
        return res.status(401).send("API key é necessária")
    }
    
    // separada o valor da chave da palavra "Bearer" de "Bearer <api key>"
    const apiKey = authHeader.split(' ')[1]

    // simulação da chave aleatória que o usuário recebeu antes de
    // ser inserida no banco de dados
    const userApiKey = '1234567890abcdef1234567890abcdef'

    // Aqui estamos validando se a chave do usuário é exatamente igual
    // a chave que foi salva no banco de dados. Se sim, significa que 
    // as credenciais estão corretas.
    if (apiKey === userApiKey) {
        next()
    }else{
        return res.status(403).send("API key inválida");
    }
}

// aplicando o middleware para fazer a verificação antes de enviar uma resposta
app.get("/api-key", authApiKey, (req, res) => {
    res.send("autenticado")
})

app.listen(3000, () => {
    console.log("rodando")
})

```

<br>

Rota | Descrição
--- | :---:
***GET*** ` http://localhost:3000/api-key ` | autentica o usuário se a chave api estiver correta

***Request***

`headers`
``` json
{
    "Authorization": "Bearer 1234567890abcdef1234567890abcdef"
}
```

***Response***

``` bash
autenticado
```

### Considerações

A api-key é uma chave única que identifica e autentica uma aplicação em um sistema.  
ela funciona como uma "senha" para a aplicação acessar uma API.  
A api-key garante que apenas usuários ou aplicações autorizadas possam acessar os dados da API,  
ajudando a proteger o sistema e a controlar o uso da API, limitando o acesso se necessário.

#### Fluxo de Autenticação
1. **Recepção da `api-key`:** Ao registrar uma aplicação, o desenvolvedor recebe uma api-key única.
2. **Envio da `api-key`:** A chave deve ser incluída em todas as requisições feitas à API.
3. **Resposta do servidor:**
    - *200 OK:* Se as credenciais estiverem corretas, o servidor responde com o recurso solicitado.
    - *401 Unauthorized:* Se as credenciais estiverem incorretas ou ausentes, o servidor retorna um status 401.

#### Quando usar?
A api-key é ideal para aplicações que necessitam de:

- Acesso seguro a dados públicos ou a informações que não exigem autenticação de usuário.
- Acesso a APIs de terceiros onde apenas a aplicação precisa ser autenticada,  
sem necessidade de autenticação específica por usuário.

#### Limitações
- **Transmissão dos dados:** Tanto API Keys quanto Basic Auth são inseguros se transmitidos sem HTTPS,  
pois os dados podem ser facilmente interceptados e usados por um atacante.
- **Requisições por chave:** Algumas APIs restringem o número de requisições que podem  
ser feitas por api-key, dependendo da política da API.
- **Acesso limitado:** Muitas vezes, a api-key oferece um acesso limitado  
comparado a métodos de autenticação mais robustos.