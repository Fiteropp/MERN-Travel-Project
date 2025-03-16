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
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    bookedDaysCount: {
        type: Number,
        required: true
    },
    bookingPayed: {
        type: Boolean,
        default: false,
        required: false
    }
});

const booking = model('Booking', bookingSchema);
export default booking;