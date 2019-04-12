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
        if(!user) return res.status(400).json({loginSuccess: false,message: 'Authentication failed. Email not found.'}) 
        //2. Si es correcto, comprueba si la contraseña es correcta
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.status(400).json({loginSuccess: false, message: 'Wrong password.'})
            //3. Si es correcto, genera un token
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)
                // Si es correcto, debemos guardar el token como un "cookie"
                res.cookie('guitarshop_auth', user.token).status(200).json({loginSuccess: true, message: `Welcome, ${user.name}!`})
            })
        })
    })
}

function authUser (req, res, next) {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
      })
}

// exportación de funciones
module.exports = {registerNewUser, loginUser, authUser}