import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    
    username: String,
    email: String,
    password: String,
    
    roleAndRights:{
        role: String,
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
    } 
    
});

const User =model('User', userSchema);
export default User;