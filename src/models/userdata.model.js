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
}, { sequelize: sequelize, modelName: "Userdata" })

Userdata.afterSave(function(u) {
    console.log("userdata created")
})

export default Userdata