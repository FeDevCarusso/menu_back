import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import bcrypt from 'bcrypt'

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, validate:
        {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize: sequelize })

User.beforeSave(async function (user, options) {
    try {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
    } catch (error) {
        throw new Error(error)
    }
})

export default User