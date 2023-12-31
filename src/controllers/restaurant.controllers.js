import { Op } from "sequelize"
import responses from "../middlewares/responses.js"
import Food from "../models/food.model.js"
import RestaurantCategory from "../models/restaurant.category.js"
import Restaurant from "../models/restaurant.model.js"
import sequelize from "../config/database.js"

export async function get_public_restaurant(req, res) {
    try {
        const { restaurant } = req.query

        const currentResto = await Restaurant.findOne({
            where: {
                restaurantName: { [Op.iLike]: `%${restaurant}%` }
            },
            attributes: ["id", "restaurantName", "restaurantImage", "businessHours"]
        })

        if (!currentResto) {
            return res.status(400).json(responses(null, "No se encontro el restaurante"))
        }

        const currentRestoCats = await RestaurantCategory.findAll({
            where: {
                RestaurantId: currentResto?.id
            },
            attributes: ["name"],
            include: {
                model: Food,
                attributes: ["name", "ingredients", "price", "image"]
            },
            order: [["name", "ASC"]]
        })



        return res.json({ currentResto, currentRestoCats })

    } catch (error) {
        throw new Error(error)
    }
}

export async function find_restaurants(req, res) {
    try {
        const { restaurant } = req.query

        const currentResto = await Restaurant.findAll({
            where: {
                restaurantName: { [Op.iLike]: `%${restaurant}%` }
            },
            include: {
                model: RestaurantCategory,
                attributes: ["name"],
                order: [sequelize.fn('CHAR_LENGTH', sequelize.col("name")), "asc"]
            },
            attributes: ["restaurantName", "restaurantImage"]
        })

        if (!currentResto) {
            return res.status(400).json(responses(null, "No se encontro el restaurante"))
        }


        return res.json(currentResto)
    } catch (error) {
        throw new Error(error)
    }
}