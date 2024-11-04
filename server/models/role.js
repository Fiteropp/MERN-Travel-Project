import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: String,
});
//USER = Default
//MODERATOR = Can Add Rooms Hotels, Bookings (for example Hotel Manager)
//ADMIN = Has Access to All

//Those roles are created and inserted in server.js
const Role = mongoose.model("Role", roleSchema);

export default Role;

