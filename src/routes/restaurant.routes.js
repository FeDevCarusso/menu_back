import { Router } from "express";
import { find_restaurants, get_public_restaurant } from "../controllers/restaurant.controllers.js";
import { validate_auth } from "../middlewares/isLogin.js";

const restaurant_routes = Router()

restaurant_routes.get("/restaurant", get_public_restaurant)
restaurant_routes.get("/", find_restaurants)


export default restaurant_routes