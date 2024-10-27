import mongoose from "mongoose";
import city from "./models/city";
const {Schema, model} = mongoose;

const hotelSchema = new Schema ({
    name: String,
    image: String,
    location: String,
    price: Number,
    rooms: Number,
    description: String,
    rating: Number,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    }
});

const hotel = model('Hotel', hotelSchema);  
export default hotel;