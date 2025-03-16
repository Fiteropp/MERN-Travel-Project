import express from "express";
import {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    getRoomsByHotel
} from "../controllers/roomController.js"
import authJwt from '../middleware/authJwt.js';

export default (app) => {
    
    //CREATE
    //Replace :hotelid with ObjectId of Hotel!
    /* Example:
        {
        "title": "Medium Room",
        "price": 100,
        "maxPeople": 2,
        "desc": "Standard Room",
        "roomNumber": 228
        }
    */
    app.post("/api/createroom/:hotelid", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], createRoom)

    //UPDATE
    //Same input as in CREATE
    //Replace :id with ObjectId of Room!
    app.put("/api/updateroom/:id", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], updateRoom)

    //DELETE
    //Replace :hotelid with ObjectId of Hotel!
    //Replace :id with ObjectId of Room!
    app.delete("/api/deleteroom/:id/:hotelid", [authJwt.verifyToken, authJwt.checkModeratorOrAdmin], deleteRoom)

    //GET
    //Replace :id with ObjectId of Room!
    app.get("/api/getroom/:id", getRoom)

    //GET ALL
    app.get("/api/getrooms", getRooms)

    //GET BY HOTEL
    //Replace :hotelid with ObjectId of Hotel!
    app.get("/api/getroomsbyhotel/:hotelid", getRoomsByHotel)
}