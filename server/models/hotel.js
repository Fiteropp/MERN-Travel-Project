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
    // Reference to City model is not required for test purposes. Afterwards, it will be required.
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: false
    }
});
// The term Hotel in mongoose.model('Hotel', hotelSchema) is the name of the collection that Mongoose
// uses when storing documents in MongoDB, 
// while hotel is the variable that references the model. 
const hotel = model('Hotel', hotelSchema);  
export default hotel;