import Restaurant from "./restaurant.model.js";
import User from "./user.model.js";
import Userdata from "./userdata.model.js";

export default function setRelations() {

    User.hasOne(Userdata)
    Userdata.belongsTo(User)
    
    Userdata.hasOne(Restaurant)
    Restaurant.belongsTo(Userdata)

    console.log("Relaciones establecidas.")
}