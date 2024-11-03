import mongoose from "mongoose";
import hotel from "./hotel.model.js";
const {Schema, model} = mongoose;

const reviewSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    comment:{
        type: String
    }
})

const review = model('Review', reviewSchema);
export default review;