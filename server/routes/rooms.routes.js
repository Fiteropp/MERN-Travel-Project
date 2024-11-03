import express from "express";
import {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom
} from "../controllers/room.controller.js"
import authJwt from '../middleware/authJwt.js';

export default (app) => {
    
    //CREATE
    app.post("/api/createroom/:hotelid", authJwt.checkModeratorOrAdmin, createRoom)

    //UPDATE
    app.put("/api/updateroom/:id", authJwt.checkModeratorOrAdmin, updateRoom)

    //DELETE
    app.delete("/api/deleteroom/:id/:hotelid", authJwt.isAdmin, deleteRoom)

    //GET
    app.get("/api/getroom/:id", getRoom)

    //GET ALL
    app.get("/api/getrooms", getRooms)
}