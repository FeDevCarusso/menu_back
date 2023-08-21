import { config } from "dotenv";
import { Sequelize } from 'sequelize'
config()

const { DATABASE } = process.env

const sequelize = new Sequelize(`${DATABASE}`, {
    dialect: "postgres",
    logging: false
})

export default sequelize