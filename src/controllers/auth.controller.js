import { Op } from 'sequelize'
import User from "../models/user.model.js"
import responses from '../middlewares/responses.js'
import { validationResult } from 'express-validator'
import passport from 'passport'

export async function register_controller(req, res) {
    try {

        const { name, email, password, restaurantName } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const parsedErrors = errors.array().map(function (err) {
                return {
                    path: err.path,
                    message: err.msg
                }
            })
            return res.status(400).json(responses(false, null, parsedErrors))
        }


        const alreadyExists = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { restaurantName: restaurantName }]
            }
        })

        if (alreadyExists) {
            return res.status(409).json(responses(false, "Ya hay un restaurante asociado a ese usuario y/o email"))
        }

        const newUser = await User.create({
            name, email, password, restaurantName
        })

        if (!newUser) {
            return res.status(500).json(responses(false, "Se produjo un error en el servidor. Reintentá"))
        }

        return res.status(200).json(responses(true, "Registro exitoso"))
    } catch (error) {
        throw new Error(error)
    }
}

export async function login_controller(req, res, next) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const parsedErrors = errors.array().map(function (err) {
                return {
                    path: err.path,
                    message: err.msg
                }
            })
            return res.status(400).json(responses(false, null, parsedErrors))
        }

        passport.authenticate("local", function (err, usr, inf) {
            if (err) {
                return next(err)
            }

            if (!usr) {
                return res.json(responses(false, inf.message))
            }

            req.login(usr, function (err) {
                if (err) {
                    res.status(500).json(responses(false, err))
                    throw new Error(err)
                }
                return res.json(responses(true, inf.message))
            })
        })(req, res, next)
    } catch (error) {
        throw new Error(error)
    }
}