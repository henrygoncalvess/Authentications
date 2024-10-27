const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    res.status(200).send('sessão de registro')
})

module.exports = router