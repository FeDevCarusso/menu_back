import { Router } from "express"
import { validate_auth } from "../middlewares/isLogin.js"
import { add_food, create_category, editRestaurantImage, get_cats, get_restaurant_info, get_user_info } from "../controllers/user.controller.js"
import { body } from "express-validator"
import upload from "../config/multer.js"

const user_routes = Router()
const addCatRules = [
    body("name")
        .exists()
        .withMessage("Este campo es obligatorio")
        .isString().withMessage("Se esperaba texto en este campo")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacio"),
]

const addFoodRules = [
    body("name").exists()
        .withMessage("Este campo es obligatorio")
        .isString()
        .withMessage("Se esperaba texto en este campo")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacio"),
    body("ingredients")
        .exists()
        .withMessage("Este campo es obligatorio")
        .isString()
        .withMessage("Datos invalidos en este campo")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacio"),
    body("cat")
        .exists()
        .withMessage("Este campo es obligatorio")
        .isString()
        .withMessage("Datos invalidos en este campo")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacio"),
    body("price")
        .exists()
        .withMessage("Este campo es obligatorio")
        .isFloat()
        .withMessage("Se esperaba numeros en este campo")

]

user_routes.get("/user_info", validate_auth, get_user_info)
user_routes.get("/restaurant_info", validate_auth, get_restaurant_info)
user_routes.post("/create_category", validate_auth, addCatRules, create_category)
user_routes.post("/add_food", upload.single("image"),validate_auth, addFoodRules, add_food)
user_routes.put("/edit_restaurant_image", upload.single("image"), validate_auth, editRestaurantImage)
user_routes.get("/all_cats", validate_auth, get_cats)
export default user_routes