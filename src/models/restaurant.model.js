import { Horarios } from "../config/classes.js";
import sequelize from "../config/database.js";

import { DataTypes, Model } from 'sequelize'


class Restaurant extends Model { }

Restaurant.init({
    restaurantName: { type: DataTypes.STRING, allowNull: false },
    businessHours: {
        type: DataTypes.JSON(DataTypes.JSON),
        defaultValue: new Horarios(),
        allowNull: false
    }
}, { sequelize: sequelize })

Restaurant.afterSave(function (u) {
})

export default Restaurant