import express from "express";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels
} from "../controllers/hotelController.js"
import authJwt from '../middleware/authJwt.js';

export default (app) => {
    
    //Create
    /* Example:
    {
        "name": "Sunrise Resort",
        "image": "https://example.com/images/sunrise-resort.jpg",
        "location": "Beachfront",
        "price": 150,
        "rating": 4.5,
        "desc": "A beautiful resort with ocean views and luxury amenities.",
        "city": "Miami",
        "address": "123 Ocean Drive, Miami, FL 33139",
        "phoneNumber": 3055551234
    }*/

    app.post("/api/createhotel", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], createHotel)

    //Update
    //Replace :id with ObjectId of Hotel
    app.put("/api/updatehotel/:id", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], updateHotel)

    //Delete
    //Replace :id with ObjectId of Hotel
    app.delete("/api/deletehotel/:id", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], deleteHotel)

    //Get
    //Replace :id with ObjectId of Hotel
    app.get("/api/findhotel/:id", getHotel)
    //Get all hotels
    app.get("/api/hotels", getAllHotels)
}