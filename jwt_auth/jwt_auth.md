<details open="open">
<summary>Tabela de Conteúdos</summary>
  
- [app.js](#app)
- [routes/register.js](#register)
- [routes/login.js](#login)
- [middlewares/auth.js](#middle)
- [Instrução de uso](#instrução-de-uso)
  - [POST/register](#post-register)
  - [POST/login](#post-login)
  - [GET - Response](#get)
- [Considerações](#considerações)
  
</details>

<br>
<br>

<a name="app">`app.js`</a>
``` javascript
const express = require('express')

// middlewares
const cors = require('cors')
const authMiddleware = require('./middlewares/auth.js')

// rotas
const loginRoutes = require('./routes/login.js')
const { registerRoutes } = require('./routes/register.js')

const app = express()

// aplicando middlewares
app.use(express.json())
app.use(cors())

// aplicando rotas
app.use('/auth', loginRoutes)
app.use('/auth', registerRoutes)

// aplicando middleware de verificação do token
app.get('/dashboard', authMiddleware, (req, res) => {

    // captura as informações que o middleware de
    // verificação do token retornou através do "req.data"
    res.status(200).send(`Bem vindo ${req.data.username}`)
})

app.listen(3000, () => {
    console.log('rodando');
})
```

<br>
<br>

<a name="register">`routes/register.js`</a>
``` javascript
const express = require('express')
const bcrypt = require('bcryptjs')
const registerRoutes = express.Router()

// armazenando as credenciais do usuário em memória (por simplicidade)
const users = []

// rota para registrar as informações do usuário
registerRoutes.post('/register', async (req, res) => {
    const { username, password } = req.body

    // procura o nome do usuário na lista
    const userExists = users.find(user => {
        return user.username === username
    })

    // verifica se ele já foi registrado
    if (userExists){
        res.status(400).send('usuário já registrado')
    }

    // utiliza  o bcryptjs para fazer o hash da senha
    // antes de armazená-la.
    const hashedPassword = await bcrypt.hash(String(password), 10)

    // insere o usuário registrado na lista
    users.push({
        username,
        password: hashedPassword
    })

    res.status(201).send(`usuário registrado com sucesso`)
})

module.exports = { registerRoutes, users }
```

<br>
<br>

<a name="login">`routes/login.js`</a>
``` javascript
const express = require('express')
const router = express.Router()
const { users } = require('./register.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// rota para logar o usuário e criar o token
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // procura o nome do usuário na lista
    const userExists = users.find(user => {
        return user.username === username
    })

    // verifica se ele ainda não se registrou
    if (!userExists){
        res.status(400).send('usuário não registrado')
    }

    // compara a senha atual com a senha encriptada
    const isPasswordValid = await bcrypt.compare(String(password), userExists.password)

    // retorna um erro se estiver errada
    if (!isPasswordValid){
        res.status(400).send('senha incorreta')
    }

    // cria um token se estiver correta
    const token = jwt.sign({ username }, 'secretKey')
    res.status(200).json({
        token: token
    })
})

module.exports = router
```

<br>
<br>

<a name="middle">`middlewares/auth.js`</a>
``` javascript
const jwt = require('jsonwebtoken')

// middleware de verificação do token
function authToken(req, res, next){
    // captura o conteúdo do header "Authorization"
    const authHeader = req.headers['authorization']

    // verifica se existe o header "Authorization"
    if (!authHeader){
        res.status(401).send('Token de acesso necessário')
    }

    // dentro de "Authorization:", separa "Bearer <token>" em 2 strings
    // captura a string do token
    const token = authHeader.split(' ')[1]

    // verifica se o token é valido
    jwt.verify(token, 'secretKey', (error, authData) => {
        if (error){
            res.status(403).send('Token inválido ou expirado')
        }

        // se for válido, a requisição passa para a próxima rota
        // com os dados do token
        req.data = authData
        next()
    })
}

module.exports = authToken
```

<br>
<br>

## Instrução de uso

Inicie o servidor local

`repositorios\clonados\Authentications\jwt_auth`
``` bash
node app.js
```

teste as respostas da autenticação seguindo o **endpoint** abaixo.

<br>
<br>

Rota | Descrição
--- | :---:
***POST*** ` http://localhost:3000/auth/register ` | rota para registrar as informações do usuário - [ver JSON](#post-register)
***POST*** ` http://localhost:3000/auth/login ` | rota para logar o usuário e criar o token - [ver JSON](#post-login)
***GET*** ` http://localhost:3000/dashboard ` | verifica a autorização do usuário através do token e libera o acesso, se for válido - [ver JSON](#get)

### <a name="post-register">POST/register - ***Request***</a>

``` json
{
    "username": "Jonh Doe",
    "password": 12345
}
```

***Response***

``` console
HTTP STATUS: 201
message: usuário registrado com sucesso
```

<br>
<br>

### <a name="post-login">POST/login - ***Request***</a>

``` json
{
    "username": "Jonh Doe",
    "password": 12345
}
```

***Response***

``` console
HTTP STATUS: 200
```

``` json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvbmggRG9lIiwiaWF0IjoxNzMwMDA3ODA3fQ.-lgRBmS5LyS7Z3H1lSa-31Vum_jAWEP2sOJucYHBw6g"
}
```

<br>
<br>

### <a name="get">GET - ***Request***</a>

`header`
``` json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvbmggRG9lIiwiaWF0IjoxNzMwMDA3ODA3fQ.-lgRBmS5LyS7Z3H1lSa-31Vum_jAWEP2sOJucYHBw6g"
}
```

***Response***

``` console
Bem Vindo Jonh Doe
```

<br>
<br>

### Considerações

JWT é um padrão aberto usado para transmitir informações de forma compacta e segura entre duas partes,  
normalmente um cliente e um servidor. Ele consiste em três partes:

1. **Header:** Indica o tipo de token (JWT) e o algoritmo de criptografia usado (ex: HMAC, SHA256).
2. **Payload:** Contém as informações a serem transmitidas, como o ID do usuário, permissões,  
ou qualquer dado relevante para a aplicação.
3. **Signature:** Uma assinatura criptográfica que garante que o conteúdo do token não foi alterado.  
É gerada combinando o header e o payload com uma chave secreta.

Após a criação, o JWT é enviado ao cliente, geralmente nos cabeçalhos das respostas HTTP.  
O cliente armazena o token (em cookies ou localStorage) e o inclui em requisições subsequentes.

#### Fluxo de Autenticação
1. **Login:** O cliente envia suas credenciais para o servidor (ex: e-mail e senha).
2. **Geração do Token:** O servidor valida as credenciais e, se forem válidas, gera um JWT, que é devolvido ao cliente.
3. **Armazenamento:** O cliente armazena o token.
4. **Autenticação de Requisição:** A cada requisição subsequente, o cliente envia o JWT  
(tipicamente no header "Authorization: Bearer <token>").
5. **Validação no Servidor:** O servidor valida o token e, se for válido, processa a requisição.  
    - *200 OK:* Se as credenciais estiverem corretas, o servidor responde com o recurso solicitado.
    - *401 Unauthorized:* Se as credenciais estiverem incorretas ou ausentes, o servidor retorna um status 401.

#### Quando usar?
- **APIs RESTful:** JWT é amplamente usado em APIs RESTful para autenticação e autorização.
- **Aplicações que requerem autenticação sem estado:** Como o token é auto-contido, o servidor  
não precisa armazenar o estado de autenticação, o que é útil para escalabilidade.

#### Limitações
- **Expiração e Revogação de Tokens:** Tokens são válidos até expirarem, o que dificulta a revogação  
- em tempo real. Se o token for comprometido antes de expirar, ele ainda poderá ser usado.
- **Tamanho do Token:** Como o JWT contém a assinatura e o payload codificado,  
ele pode ser maior do que um simples ID de sessão.
