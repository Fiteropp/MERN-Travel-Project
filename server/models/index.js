import mongoose from "mongoose";
import User from "./user.js";
import Role from "./role.js";
import Booking from "./booking.js";
import City from "./city.js";
import Hotel from "./hotel.js";
import Review from "./review.js";

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  user: User,
  role: Role,
  booking: Booking,
  city: City,
  hotel: Hotel,
  review: Review,
  ROLES: ["user", "admin", "moderator"],
};

export default db;

