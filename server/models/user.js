import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    roleAndRights: {
        title: ["Admin", "Customer", "Guest"],
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean
    } 
});

const user = model('User', userSchema);
export default user;