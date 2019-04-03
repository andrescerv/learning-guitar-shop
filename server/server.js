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
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({success: false, err})
    res.status(200).json({
      success: true,
      userdata: doc
    })
  })
})

//inciando sesión con 'users' y creando 'tokens'
app.post('/api/users/login', (req, res) =>{
  //1. Encuentra el correo
  User.findOne({'email': req.body.email}, (err, user) =>{
    if(!user) return res.json({loginSuccess: false, message: 'Autenticación fallida. Email no encontrado'})
  })
  //2. Obtén el password y compruébalo
  // app.get((req, res) =>{
  //   const passwordConfirmation = req.body.password
  //   return res.json(passwordConfirmation)
  //   //3. Si todo es correcto, genera un token
  //   if(passwordConfirmation == this.user.password) {
  //     return 'Éxito!'
  //     var rand = function() {
  //       return Math.random().toString(36).substr(2)
  //     }
  //     var token = function() {
  //       return rand() + rand()
  //     }
  //     return token()
  // } else {
  //   return('Error')
  // })
})


const port = process.env.PORT || 3002

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})