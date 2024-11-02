import express from "express";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel
} from "../controllers/hotel.controller"
import hotel from "../models/hotel.model"
import { authJwt } from "../middleware/authJwt"

export default (app) => {
    const app = express();
    
    //Create
    app.post("/api/createhotel", authJwt.checkModeratorOrAdmin, createHotel)

    //Update
    app.put("/api/updatehotel/:id", authJwt.checkModeratorOrAdmin, updateHotel)

    //Delete
    app.delete("/api/deletehotel/:id", authJwt.isAdmin, deleteHotel)

    //Get
    app.get("/api/findhotel/:id", getHotel)
}