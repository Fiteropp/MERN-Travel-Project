import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    roleAndRights: {
        
    } 
});

const user = model('User', userSchema);
export default user;