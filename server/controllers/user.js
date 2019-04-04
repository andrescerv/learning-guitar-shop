// importación del modelo
const {User} = require('../models/user')

// funciones

function registerNewUser (req, res, next) { //registra usuario nuevo
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
}

function loginUser (req, res, next) { //inciando sesión con 'users' y creando 'tokens'
    //1. encuentra el correo
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({
            loginSuccess: false,
            message: 'Autenticación fallida: email no encontrado.'
        })
        res.json({
            loginSuccess: true,
            message: `Bienvenido ${req.body.email}`
        })
    })
    //2. obtén el password y comprúebalo
}

// exportación de funciones
module.exports = {registerNewUser, loginUser}