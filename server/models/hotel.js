
import mongoose from "mongoose";
import city from "./city.js";
const {Schema, model} = mongoose;

const hotelSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rooms: {
        type: [String]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },    
    desc: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    assignedModerators:{
        type: [String]
    }
});
// The term Hotel in mongoose.model('Hotel', hotelSchema) is the name of the collection that Mongoose
// uses when storing documents in MongoDB, 
// while hotel is the variable that references the model. 
const hotel = model('Hotel', hotelSchema);  
export default hotel;
