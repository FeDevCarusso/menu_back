import sequelize from "../config/database.js";

import { Model } from 'sequelize'


class Restaurant extends Model { }

Restaurant.init({}, { sequelize: sequelize })

Restaurant.afterSave(function(u) {
    console.log("Restaurant created")
})

export default Restaurant