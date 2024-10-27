const express = require('express')
const cors = require('cors')
const protectedRoutes = require('./routes/protected.js')
const publicRoutes = require('./routes/public.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/admin', protectedRoutes)
app.use('/public', publicRoutes)

app.listen(3000, () => {
    console.log('rodando');
})