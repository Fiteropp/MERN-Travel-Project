import mongoose from "mongoose";
const {Schema, model} = mongoose;

const citySchema = new Schema ({
    name: String,
    image: String,
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    }
});

const city = model('City', citySchema);
export default city;