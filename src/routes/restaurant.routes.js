import { Router } from "express";
import { get_public_restaurant } from "../controllers/restaurant.controllers.js";
import { validate_auth } from "../middlewares/isLogin.js";

const restaurant_routes = Router()

restaurant_routes.get("/", get_public_restaurant)

export default restaurant_routes