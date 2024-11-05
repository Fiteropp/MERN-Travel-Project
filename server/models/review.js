import mongoose from "mongoose";
//import hotel from "./hotel";
//import user from "./user";
const {Schema, model} = mongoose;

const reviewSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    rating: Number,
    comment: String
})

const review = model('Review', reviewSchema);
export default review;