import User from "./user.model.js";
import Userdata from "./userdata.model.js";

export default function setRelations() {
  
    User.hasOne(Userdata)
    Userdata.belongsTo(User)

    console.log("Relaciones establecidas.")
}