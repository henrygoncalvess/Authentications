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