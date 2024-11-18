import express from 'express';
import {
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking

} from "../controllers/bookingController.js"
import authJwt from "../middleware/authJwt.js"


export default (app) => {
    
    //CREATE
    app.post("/api/bookings", authJwt.verifyToken, createBooking);

    //GET
    app.get("/api/bookings", authJwt.verifyToken, getBooking);

    //UPDATE
    app.put("/api/bookings/:bookingid", authJwt.verifyToken, updateBooking);
    
    //DELETE
    app.delete("/api/delbooking/:bookingid", authJwt.verifyToken, deleteBooking);

}