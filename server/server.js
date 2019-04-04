// importaciones
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

const {User} = require('./models/user')

const userControllers = require('./controllers/user')

// middlewares
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}, (err) => { // mongoose middleware
  if(err) return `No se pudo conectar a Mongoose: ${err}`
  console.log("Conectado a MongoDB")
})

app.use(express.urlencoded({extended: true})) // express middlewares
app.use(express.json())
app.use(cookieParser())

// rutas de 'USER'
app.post('/api/users/register', userControllers.registerNewUser) // registra usuario nuevo
app.post('/api/users/login', userControllers.loginUser) // inciando sesión con 'users' y creando 'tokens'

// puerto
const port = process.env.PORT || 3002

// listener
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})