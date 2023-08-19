import Food from "./food.model.js";
import RestaurantCategory from "./restaurant.category.js";
import Restaurant from "./restaurant.model.js";
import User from "./user.model.js";
import Userdata from "./userdata.model.js";

export default function setRelations() {

    User.hasOne(Userdata)
    Userdata.belongsTo(User)

    Userdata.hasOne(Restaurant)
    Restaurant.belongsTo(Userdata)

    Restaurant.hasMany(RestaurantCategory)
    RestaurantCategory.belongsTo(Restaurant)

    RestaurantCategory.hasMany(Food)
    Food.belongsTo(RestaurantCategory)


    console.log("Relaciones establecidas.")
}