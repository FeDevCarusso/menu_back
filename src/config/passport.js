import { Op } from 'sequelize'
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'

import User from "../models/user.model.js";
import passport from 'passport';

const passportLocal = new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ restaurantName: username }, { email: username }]
            }
        })

        if (!user) {
            return done(null, false, { message: "Restaurante no encontrado" })
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
                return done(null, false, { message: "Contraseña incorrecta" })
            }

            return done(null, { id: user.id }, { message: "Inicio de sesión correcto" })
        })
    } catch (error) {
        done(error)
    }
})

export default function configurePassport() {
    passport.use(passportLocal)
    passport.serializeUser(function (user, done) {
        return done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        return done(null, user)
    })

}