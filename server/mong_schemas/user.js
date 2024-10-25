import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    role: Role
});

const User =model('User', userSchema);
export default User;