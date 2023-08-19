import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Food extends Model { }

Food.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
}, { sequelize: sequelize })

export default Food