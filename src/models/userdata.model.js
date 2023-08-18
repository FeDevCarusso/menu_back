import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

class Userdata extends Model { }

Userdata.init({
    tempCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    payDate: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, { sequelize: sequelize })




export default Userdata