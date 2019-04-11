// importación del modelo
const {User} = require('../models/user')

// funciones
function registerNewUser (req, res, next) { //registra usuario nuevo
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.status(404).json({success: false, err})
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
}

function loginUser (req, res, next) { //inciando sesión con 'users' y creando 'tokens'
    //1. comprueba si el correo está registrado
    User.findOne({'email': req.body.email}, (err, user) => {
        res.send('Funciona la conexión')
        if(!user) return res.status(400).json({loginSuccess: false,message: 'Authentication failed. Email not found.'}) 
        res.json('Sí existe!')

        //2. comprueba si la contraseña es correcta
        // user.comparePassword(req.body.password, (err, isMatch) => {
        //     if (!isMatch) return res.json({
        //         loginSuccess: false,
        //         message: 'Password erróneo'
        //     })
        //     // si todo es correcto, genera un token
        //     user.generateToken((err, user) => {
        //         if(err) return res.status(400).send(err)
        //         //si todo bien, debemos guardar este token como 'cookie'
        //         res.cookie('guitarshop_auth', user.token).status(200).json({
        //             loginSuccess: true
        //         })
        //     })
        // })
    })
}

// exportación de funciones
module.exports = {registerNewUser, loginUser}