const express = require('express')
const cors = require('cors')
const loginRoutes = require('./routes/login.js')
const { registerRoutes } = require('./routes/register.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', loginRoutes)
app.use('/api', registerRoutes)

app.listen(3000, () => {
    console.log('rodando');
})