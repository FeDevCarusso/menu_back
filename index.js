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

const { PORT } = process.env
sequelize.authenticate().then(async function () {
    setRelations()
    await User.sync({ force: true })
    console.log("Database working")
    app.listen(PORT || 3002, () => console.log(`Server running on port ${PORT || 3002}`))
})