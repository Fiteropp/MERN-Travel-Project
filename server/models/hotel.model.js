import mongoose from "mongoose";
import city from "./models/city";
const {Schema, model} = mongoose;

const hotelSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
        type: Schema.Types.ObjectId,
        ref: 'city'
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
});

const hotel = model('Hotel', hotelSchema);  
export default hotel;