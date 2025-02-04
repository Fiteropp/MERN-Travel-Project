import Hotel from "../models/hotel";
import User from "../models/user";
import mongoose from "mongoose";

export const listAllUsers = async (req, res, next) => {
  try {
    users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
    res.status(418).send({ message: err.message });
  }
};

export const getUserDataById = async (req, res, next) => {
  try {
    userId = req.params.userid;

    userdata = await User.findById(userId);
    res.status(200).json(userdata);
  } catch (err) {
    next(err);
  }
};

export const addModToHotel = async (req, res, next) => {
  try {
    moderatorId = req.params.modid;
    hotelId = req.params.hotelid;

    Hotel.findByIdAndUpdate(
      hotelId,
      { $addToSet: { assignedModerators: moderatorId } },
      { new: true }
    );
    res.status(200).send({ message: "Moderator Added To Hotel Sucsessfully" });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  try {
    userId = req.params.userid;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ message: "User Sucsessfully Updated!" });
  } catch (err) {
    next(err);
  }
};
