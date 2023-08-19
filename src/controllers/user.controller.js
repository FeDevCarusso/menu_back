import User from "../models/user.model.js"
import responses from "../middlewares/responses.js"
import Restaurant from "../models/restaurant.model.js"
import Userdata from "../models/userdata.model.js"

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
        const currentUserdata = await Userdata.findOne({
            where: {
                UserId: req.user?.id
            },
            include: {
                model: Restaurant,

            },
            attributes: []
        })



        return res.status(200).json(responses(null, null, currentUserdata?.Restaurant))
    } catch (error) {
        throw new Error(error)
    }
}