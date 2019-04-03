const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

const {User} = require('./models/user')

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}, (err) => {
  if(err) return `no se conectó a Mongoose: ${err}`
  console.log("Conectado a MongoDB")
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

// rutas de 'USER'
app.post('/api/users/register', (req, res) => {
  res.status(200).send('Funciona la conexión!')
})

const port = process.env.PORT || 3002

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})