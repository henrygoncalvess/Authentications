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