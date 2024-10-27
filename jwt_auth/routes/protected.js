const express = require('express')
const router = express.Router()

router.get('/dashboard', (req, res) => {
    res.status(200).send('autenticado')
})

module.exports = router