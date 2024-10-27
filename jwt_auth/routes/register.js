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