import sequelize from "../config/database.js";
import { Model, DataTypes } from 'sequelize'

class RestaurantCategory extends Model { }

RestaurantCategory.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: sequelize })

export default RestaurantCategory