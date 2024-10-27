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
  
</details>

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
app.use('/api', loginRoutes)
app.use('/api', registerRoutes)

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
    res.status(200).json(token)
})

module.exports = router
```

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

## Instrução de uso

Inicie o servidor local

`repositorios\clonados\Authentications\jwt_auth`
``` bash
node app.js
```

teste as respostas da autenticação seguindo o **endpoint** abaixo.

<br>

Rota | Descrição
--- | :---:
***POST*** ` http://localhost:3000/auth/register ` | rota para registrar as informações do usuário - [ver JSON](#post-register)
***POST*** ` http://localhost:3000/auth/login ` | rota para logar o usuário e criar o token - [ver JSON](#post-login)
***GET*** ` http://localhost:3000/dashboard ` | verifica a autorização do usuário através do token e libera o acesso, se for válido - [ver JSON](#get---response)

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

### <a name="get">GET - ***Response***</a>

``` console
Bem Vindo Jonh Doe
```

<br>

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
