//IMPORTACIONES
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_I = 10 //este número ayuda a encriptar mejor

//SCHEMA
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

//MIDDLEWARE
userSchema.pre('save', function(next){ //este pedazo de código se puede resumir con asincronía
    var user = this
    if(user.isModified('password')){   
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

//EXPORTS
const User = mongoose.model('User', userSchema, 'users')
module.exports = {User}