import User from "../models/user.model.js"
import responses from "../middlewares/responses.js"
import Restaurant from "../models/restaurant.model.js"
import { validationResult } from "express-validator"
import RestaurantCategory from "../models/restaurant.category.js"
import Food from "../models/food.model.js"


export async function get_user_info(req, res) {
    try {
        const user = await User.findOne({
            where: { id: req.user?.id },
            attributes: { exclude: ["password"] }
        })
        return res.status(200).json(responses(null, null, user))
    } catch (error) {
        throw new Error(error)
    }
}

export async function get_restaurant_info(req, res) {
    try {
        const { restaurantName } = req?.user
        const restaurant = await Restaurant.findOne({
            where: {
                restaurantName
            },

            attributes: ["id", "restaurantName", "businessHours", "UserdatumId"]
        })

        if (!restaurant) {
            return res.status(400).json(responses(null, "El restaurante no existe."))
        }

        const returnData = {
            horarios: restaurant?.businessHours?.horarios,
            restaurantName: restaurant.restaurantName,
        }

        return res.status(200).json(responses(null, null, returnData))
    } catch (error) {
        throw new Error(error)
    }
}

export async function create_category(req, res) {
    try {
        const { name } = req.body
        const { restaurantName } = req?.user
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


        if (!req.user?.restaurantName) {
            req.logout(function (err) {
                if (err) {
                    throw new Error(err)
                }
                return res.status(400).json(responses(false, "Inicia sesión nuevamente"))
            })
        }

        const restaurant = await Restaurant.findOne({
            where: {
                restaurantName
            },
            include: {
                model: RestaurantCategory,
                // attributes: []
            },
            attributes: ["id"]
        })

        if (!restaurant) {
            return res.status(400).json(responses(false, "El restaurante no existe"))
        }

        let currentCats = await RestaurantCategory.findAll({
            where: {
                RestaurantId: restaurant?.id
            }
        })

        const parsedCats = currentCats.map(x => x.dataValues?.name)
        if (parsedCats.includes(name)) {
            return res.status(409).json(responses(false, `La categoria ${name} ya existe`))
        }
        const newCat = await RestaurantCategory.create({
            name
        })

        await newCat.setRestaurant(restaurant)

        return res.status(200).json(responses(true, `Categoria ${name} añadida con exito`))
    } catch (error) {
        throw new Error(error)
    }
}

export async function add_food(req, res) {
    try {
        const { restaurantName } = req?.user
        const image = req?.file?.filename
        const { name, ingredients, price, cat } = req.body

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

        const restaurant = await Restaurant.findOne({
            where: {
                restaurantName: restaurantName
            },
            attributes: ["id"]
        })

        const category = await RestaurantCategory.findOne({
            where: {
                RestaurantId: restaurant?.id,
                name: cat
            }
        })

        const newFood = await Food.create({
            name,
            ingredients: ingredients.split(","),
            price,
            image
        })

        await newFood.setRestaurantCategory(category)

        return res.json(responses(true, "Añadido con exito"))

    } catch (error) {
        throw new Error(error)
    }
}

export async function editRestaurantImage(req, res) {
    try {
        const image = req?.file?.filename
        const { restaurantName } = req?.user

        const updated = await Restaurant.update({
            restaurantImage: image
        }, {
            where: {
                restaurantName: restaurantName
            }
        })

        if (!updated) {
            return res.status(500).json(responses(false, "Error al cambiar imagen, reintentá"))
        }

        return res.json(responses(true, "Imagen cambiada con exito"))
    } catch (error) {
        throw new Error(error)
    }
}