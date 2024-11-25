import db from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";

dotenv.config();

const User = db.user;
const Role = db.role;

export const signup = async (req, res) => {
  try {
    // Create a new user object
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Assign roles to the user
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id]; // Default to "user" role
    }

    // Save the user with assigned roles
    await user.save();
    res.status(201).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || config.secret,
      { algorithm: "HS256", expiresIn: 86400 }
    );

    const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    res.cookie('jwt', token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use Secure in production
      sameSite: 'Strict', // Controls whether cookies are sent with cross-origin requests
      maxAge: 3600000 // 1 hour in milliseconds
    });

    res.status(200).send({
      message: "Sucsessfuly Logged In",
      id: user._id,
      username: user.username,
      accessToken: token,
      roles: authorities
      
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


//User data
export const getUserData = async (req, res, next) => {
  const userId = req.userId;
  try {
      const user = await User.findOne({_id: userId });
      res.json({
        id: user._id,
        img: user.img,
        email: user.email,
        name: user.fullName,
        surname: user.surname,
        username: user.username,
        phone: user.phone});
  } catch (err) {
      next(err);
  }
};

export const updateUserData = async (req, res, next) => {
  const userId = req.userId;
  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: req.body },
          { new: true }
      );
      res.status(200).send({message: "User Sucsessfully Updated!"})
  } catch(err) {
      next(err);
  }
};
