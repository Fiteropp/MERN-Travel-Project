import Hotel from "../models/hotel.js";
import User from "../models/user.js";
import Booking from "../models/booking.js";
export const createBooking = async (req, res, next) => {
    const { hotel, user, checkIn, checkOut, room } = req.body;

    try {
        // Validate that the hotel exists
        const hotelExists = await Hotel.findById(hotel);
        if (!hotelExists) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        // Check if the rooms are available for the selected dates
        const existingBookings = await Booking.find({
            hotel: hotel,
            room: room,
            $or: [
                {
                    checkIn: { $lt: new Date(checkOut) },
                    checkOut: { $gt: new Date(checkIn) }
                }
            ]
        });

        if (existingBookings.length > 0) {
            return res.status(400).json
            (
                { message: "Room is already booked for the selected dates" }
            );
        }

        // Create new booking with user association
        const newBooking = new Booking({
            user: user,  // Explicitly associate the booking with the user
            hotel: hotel,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            room: room,
        });

        // Save the booking
        const savedBooking = await newBooking.save();

        // Optionally, you might want to add the booking to the user's bookings
        await User.findByIdAndUpdate(
            user, 
            { $push: { bookings: savedBooking._id } },
            { new: true }
        );

        res.status(201).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

export const getBooking = async (req, res, next) => {
    const userId = req.user;
    const hotelId = req.params.hotel; // Assuming you want to fetch bookings for a specific hotel

    try {
        // If hotelId is provided, find bookings for the specific user and hotel
        // Otherwise, find all bookings for the user
        const query = hotelId 
            ? { user: userId, hotel: hotelId }
            : { user: userId };

        const bookings = await Booking.find(query)

        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
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