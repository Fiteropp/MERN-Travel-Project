const express = require("express");
import mongoose from 'mongoose';

import Booking from './models/booking.js';

const app = express();


app.post("/bookings", (req, res) => {
    const booking = new Booking({
        /* Booking data API */
    })
})


app.get("/bookings/:user", (req, res) => {
    /*User Bookings API */
})