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