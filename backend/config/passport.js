const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy //el metodo para generar la estrategia de autenticacion
const extractJwt = require('passport-jwt').ExtractJwt //construccion de extracion de jwt xq tenemos que separar el token en diferentes partes

const User = require('../models/modelUsers')

module.exports = passport.use(new jwtStrategy({

        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),

        secretOrKey: process.env.SECRET_KEY

    },(jwt_payload,done)=>{

    //console.log("🚀 ~ file: passport.js ~ line 14 ~ jwt_payload", jwt_payload)

    User.findOne({_id:jwt_payload.id})
    
    .then(user => {
        console.log(user)
        if (user) {
            return done(null, user)
        }
        else if (err) {
            return done(err, false);
        }
        else{
            return done(null, false)
        }
    })
    .catch(err => {
        return done(err,false)
    })

}))



