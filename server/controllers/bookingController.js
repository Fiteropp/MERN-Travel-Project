import Hotel from "../models/hotel.js";
import Booking from "../models/booking.js";

export const createBooking = async (req, res, next) => {
    const { hotel, checkIn, checkOut, room } = req.body;
    const userId = req.userId;

    try {
        // Validate that the hotel exists
        const hotelExists = await Hotel.findById(hotel);
        if (!hotelExists) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const newBooking = new Booking({
            user: userId,
            hotel: hotel,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            room: room,
        });

        // Save the booking
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        next(err);
    }
};


export const getBooking = async (req, res, next) => {
    const userId = req.userId;
    try {
        const bookings = await Booking.find({ user: userId }); 
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

export const updateBooking = async (req, res, next) => {
    const bookingid = req.params.bookingid;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingid,
            { $set: req.body },
            { new: true }
        );
        res.status(200).send(updatedBooking)
    } catch(err) {
        next(err);
    }
};

export const deleteBooking = async (req, res, next) => {
    const bookingid = req.params.bookingid;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingid);
        res.status(200).send(deletedBooking)
    }catch(err) {
        next(err);
    }
};