import { Router } from "express"
import { validate_auth } from "../middlewares/isLogin.js"
import { get_restaurant_info, get_user_info } from "../controllers/user.controller.js"

const user_routes = Router()

user_routes.get("/user_info", validate_auth, get_user_info)
user_routes.get("/restaurant_info", validate_auth, get_restaurant_info)

export default user_routes