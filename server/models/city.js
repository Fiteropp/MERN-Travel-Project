import mongoose from "mongoose";
const {Schema, model} = mongoose;

const citySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

const city = model('City', citySchema);
export default city;