const express = require('express');
const app = express();

// Middleware para autenticação básica
function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username === 'admin' && password === 'password') {
        next();
    } else {
        res.status(401).send('Invalid credentials');
    }
}

// Rota protegida por autenticação básica
app.get('/basic-auth', basicAuth, (req, res) => {
    res.send('Você está autenticado!');
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});