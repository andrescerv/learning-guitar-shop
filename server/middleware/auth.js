const {User} = require('./../models/user')

let auth = (req, res, next) => {

    let token = req.cookies.guitarshop_auth

    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.json({
            isAuth: false,
            error: true,
            message:'no es el user'
        })
        req.token = token
        req.user = user
        next()
    })
}

module.exports = {auth}