import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookingSchema = new Schema ({
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
    date: Date
});

const booking = model('Booking', bookingSchema);
export default booking;