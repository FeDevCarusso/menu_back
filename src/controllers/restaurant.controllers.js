import responses from "../middlewares/responses.js"
import Food from "../models/food.model.js"
import RestaurantCategory from "../models/restaurant.category.js"
import Restaurant from "../models/restaurant.model.js"

export async function get_public_restaurant(req, res) {
    try {
        const { restaurant } = req.query

        const currentResto = await Restaurant.findOne({
            where: {
                restaurantName: restaurant
            },

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
                attributes: ["name"]
            },
            order: [["name", "DESC"]]
        })




        return res.json({
            restaurant: {
                restaurantName: currentResto.restaurantName,
                businessHours: currentResto.businessHours?.horarios
            },
            categories: currentRestoCats?.map(function (current) {
                return {
                    name: current.name,
                    food: current.Food?.map(cf => cf.name)
                }
            })
        })

    } catch (error) {
        throw new Error(error)
    }
}