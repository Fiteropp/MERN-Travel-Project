import express from "express";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel
} from "../controllers/hotelController.js"
import authJwt from '../middleware/authJwt.js';

export default (app) => {
    
    //Create
    app.post("/api/createhotel", authJwt.checkModeratorOrAdmin, createHotel)

    //Update
    app.put("/api/updatehotel/:id", authJwt.checkModeratorOrAdmin, updateHotel)

    //Delete
    app.delete("/api/deletehotel/:id", authJwt.isAdmin, deleteHotel)

    //Get
    app.get("/api/findhotel/:id", getHotel)
}