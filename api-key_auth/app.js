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
