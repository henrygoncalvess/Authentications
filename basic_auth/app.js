const express = require('express');
const app = express()

// Middleware para autenticação básica
function basicAuth(req, res, next){
    // captura o header com o valor de 'authoritation'
    const authHeader = req.headers['authorization']

    // verifica se o header existe
    if (!authHeader){
        res.status(401).send('autorização necessária')
    }

    // separada a string base64 da palavra 'Basic' de 'Basic ??????='
    const base64Credentials = authHeader.split(' ')[1]

    // decodifica a string base64 para texto -> 'toString()'
    const credentials = Buffer.from(base64Credentials, 'base64').toString()

    // com a string decodificada no formato username:password,
    // dividimos usando split(':'). Isso separa o nome de usuário da senha,
    // armazenando-os nas variáveis username e password.
    const [username, password] = credentials.split(':')

    // Aqui estamos validando se o nome de usuário e a senha são exatamente
    // iguais a "teste" e "123". Se sim, significa que as credenciais estão corretas.
    if (username === 'teste' && password === '123'){
        next()
    }else{
        res.status(401).send('credenciais incorretas')
    }
}

app.get('/basic-auth', basicAuth, (req, res) => {
    res.send('autenticado')
})

app.listen(3000, () => {
    console.log('rodando');
})