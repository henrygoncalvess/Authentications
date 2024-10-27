const express = require('express')
const router = express.Router()
const { users } = require('./register.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // procura o nome do usuário na lista
    const userExists = users.find(user => {
        return user.username === username
    })

    // verifica se ele ainda não se registrou
    if (!userExists){
        res.status(400).send('usuário não encontrado')
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