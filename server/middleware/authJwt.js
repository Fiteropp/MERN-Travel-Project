import jwt from 'jsonwebtoken';
import db from "../models/index.js"; 
import 'dotenv/config';

const User = db.user;
const Role = db.role;


const verifyToken = async (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.jwt; // Assuming the cookie name is 'jwt'

    if (!token) {
        return res.status(403).send({ message: "Error, no token provided" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Set the user ID from the token
        next();
    } catch (err) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });

        if (roles.some(role => role.name === "admin")) {
            return next();
        }

        return res.status(403).send({ message: "Require Admin Role!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });

        if (roles.some(role => role.name === "moderator")) {
            return next();
        }

        return res.status(403).send({ message: "Require Moderator Role!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const checkModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });

        if (roles.some(role => role.name === "moderator" || role.name === "admin")) {
            return next();
        }

        return res.status(403).json({ message: "Require Moderator or Admin role!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    checkModeratorOrAdmin
};

export default authJwt;
