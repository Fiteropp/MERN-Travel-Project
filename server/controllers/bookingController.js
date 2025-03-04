import Hotel from "../models/hotel.js";
import User from "../models/user.js";
import Booking from "../models/booking.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createBooking = async (req, res, next) => {
    const { hotel, user, checkIn, checkOut, room, price, guests, bookedDaysCount } = req.body;

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
            price: price,
            guests: guests,
            bookedDaysCount, bookedDaysCount
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
    const userId = req.userId;

    try {

        const bookings = await Booking.find({user: userId})
        .populate("hotel")  // Fetch hotel details
        .populate("room") ;
        
        if (!bookings.length) {
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



export const createPaymentIntent = async (req, res, next) =>{
    const bookingid  = req.body.bookingid;
    try {
          // Fetch the booking details
        const booking = await Booking.findById(bookingid);
        if (!bookingid) {
            return res.status(400).json({ message: "Booking ID is required" });
        }
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const amount = booking.price;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects the amount in cents
            currency: 'eur',
            payment_method_types: ["card"],
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        //res.status(500).json({ message: err.message });
        next(err);
    }
};


export const confirmPayment = async (req, res, next) => {
    const bookingid = req.body.bookingid;
    try {
        if (!bookingid) {
            return res.status(400).json({ message: "Booking is required" });
        }
        
        const payedBooking = await Booking.findByIdAndUpdate(
            bookingid,
            { bookingPayed: true },
            { new: true }
        );
        res.status(200).send(payedBooking);
    } catch (err) {
        next(err);
    }
};


