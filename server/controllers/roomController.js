import Room from "../models/room.js";
import Hotel from "../models/hotel.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedroom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedroom._id},
            });
        } catch(err) {
            next(err);
        }
        res.status(200).json(savedroom);
    } catch(err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            });
        } catch (err){
            next(err);
        }

    } catch (err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};

export const getRoomsByHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const rooms = await Room.find({ _id: { $in: hotel.rooms } });
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
        res.status(500).send({ message: err.message });
    }
};