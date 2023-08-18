import { Router } from "express"
import { login_controller, register_controller } from "../controllers/auth.controller.js"
import { body } from "express-validator"
import is_login from "../middlewares/isLogin.js"

const auth_routes = Router()

const registerRules = [
    body("name")
        .exists()
        .withMessage("Se requieren todos los campos")
        .isString()
        .withMessage("Todos los campos deben ser texto")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacío"),
    body("email")
        .exists()
        .withMessage("Se requieren todos los campos")
        .isEmail()
        .withMessage("Ingresá un email.")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacío"),
    body("password")
        .exists()
        .withMessage("Se requieren todos los campos")
        .isStrongPassword({
            minLength: 6,
            minSymbols: 0,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Ingresá una contraseña segura")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacío"),
    body("restaurantName")
        .exists()
        .withMessage("Se requieren todos los campos")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacío"),
]

const loginRules = [
    body("password")
        .exists()
        .withMessage("Completá todos los campos.")
        .isString()
        .withMessage("Se esperaba texto en los campos")
        .isLength({ min: 1 }).withMessage("Debes completar este campo"),
    body("username")
        .exists()
        .withMessage("Completá todos los campos.")
        .isString()
        .withMessage("Se esperaba texto en los campos")
        .isLength({ min: 1 }).withMessage("Debes completar este campo"),
]

auth_routes.post("/register", registerRules, register_controller)
auth_routes.post("/login", loginRules, login_controller)
auth_routes.get("/is_login", is_login)

export default auth_routes