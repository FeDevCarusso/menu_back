import { config } from 'dotenv'
import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import sequelize from './src/config/database.js'
import User from './src/models/user.model.js'
import setRelations from './src/models/model.relations.js'
import passport from 'passport'
import session from 'express-session'
import configurePassport from './src/config/passport.js'
import auth_routes from './src/routes/auth.routes.js'
import Userdata from './src/models/userdata.model.js'
import Restaurant from './src/models/restaurant.model.js'
import RestaurantCategory from './src/models/restaurant.category.js'
import user_routes from './src/routes/user.routes.js'
import restaurant_routes from './src/routes/restaurant.routes.js'
import Food from './src/models/food.model.js'

config({
    path: "./.env"
})

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(morgan("dev"))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())

configurePassport()

app.use("/auth", auth_routes)
app.use("/user", user_routes)
app.use("/", restaurant_routes)


const { PORT } = process.env
sequelize.authenticate().then(async function () {
    setRelations()
    await User.sync({ force: false })
    await Userdata.sync({ force: false })
    await Restaurant.sync({ force: false })
    await RestaurantCategory.sync({ force: false })
    await Food.sync({ force: false })

    console.log("Database working")
    app.listen(PORT || 3002, () => console.log(`Server running on port ${PORT || 3002}`))
})