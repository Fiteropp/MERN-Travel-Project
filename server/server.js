import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import hotelsRoutes from './routes/hotels.routes.js';
import roomsRoutes from './routes/rooms.routes.js';
import bookingRoutes from './routes/booking.routes.js';
dotenv.config();


const app = express();

import db from "./models/index.js";
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(express.json());

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

const db_url = process.env.CONNECTION_STRING;

db.mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  authRoutes(app); // auth routes
  userRoutes(app); // autorization test routes
  hotelsRoutes(app);
  roomsRoutes(app);
  bookingRoutes(app);

  async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
  
      if (count === 0) {
        const roles = [
          { name: "user" },
          { name: "moderator" },
          { name: "admin" },
        ];
  
        for (const roleData of roles) {
          const role = new Role(roleData);
          await role.save();
          console.log(`added '${role.name}' to roles collection`);
        }
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
  };
  


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
