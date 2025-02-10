import Hotel from "../models/hotel.js";
import User from "../models/user.js";
import Role from "../models/role.js";
import mongoose from "mongoose";

export const listAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: false }).populate(
      "roles",
      "name"
    );

    res.status(200).json(users);
  } catch (err) {
    next(err);
    res.status(400).send({ message: err.message });
  }
};

export const getUserDataById = async (req, res, next) => {
  try {
    const userId = req.params.userid;

    const userdata = await User.findById(userId)
      .select("-password")
      .populate("roles", "name");
    res.status(200).json(userdata);
  } catch (err) {
    next(err);
  }
};

export const addModToHotel = async (req, res, next) => {
  try {
    const moderatorId = req.params.modid;
    const hotelId = req.params.hotelid;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $addToSet: { assignedModerators: moderatorId } },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).send({ message: "Hotel not found" });
    }

    res.status(200).send({ message: "Moderator Added To Hotel Successfully" });
  } catch (err) {
    next(err);
  }
};

export const editUserRole = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const roleId = req.body.roleId

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ message: "User Role Sucsessfully Updated!" });
  } catch (err) {
    next(err);
  }
};
