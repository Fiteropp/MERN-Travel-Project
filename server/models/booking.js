import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookingSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    dateIn: Date,
    dateOut: Date
});

const booking = model('Booking', bookingSchema);
export default booking;