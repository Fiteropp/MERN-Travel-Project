import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import Booking from "./booking.model.js";
import City from "./city.model.js";
import Hotel from "./hotel.model.js";
import Review from "./review.model.js";

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

