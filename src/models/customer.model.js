import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Customer extends Model {

}

Customer.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
}, { sequelize: sequelize })

export default Customer
