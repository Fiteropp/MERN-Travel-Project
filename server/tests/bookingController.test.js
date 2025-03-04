import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createBooking, getBooking, updateBooking, deleteBooking } from '../controllers/bookingController';
import Booking from '../models/booking';
import Hotel from '../models/hotel';
import User from '../models/user';
import Room from '../models/room';
import authJwt from '../middleware/authJwt';
import jwt from 'jsonwebtoken';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

app.post('/api/bookings', authJwt.verifyToken, createBooking);
app.get('/api/bookings', authJwt.verifyToken, getBooking);
app.put('/api/bookings/:bookingid', authJwt.verifyToken, updateBooking);
app.delete('/api/bookings/:bookingid', authJwt.verifyToken, deleteBooking);

describe('Booking Controller', () => {
    let hotelId;
    let userId;
    let roomId;
    let bookingId;
    let token;

    beforeAll(async () => {
        // Connect to the test MongoDB server using the connection string from .env
        await mongoose.connect(process.env.TEST_DB_STRING);
    }, 45000); // 45 seconds timeout

    beforeEach(async () => {
        // Clean up the test database
        await mongoose.connection.db.dropDatabase();

        // Create a hotel, room, and user for testing
        const hotel = new Hotel({
            name: 'Test Hotel',
            address: '123 Test St',
            phoneNumber: 1234567890,
            city: 'Test City',
            desc: 'A test hotel',
            price: 100,
            location: 'Test Location'
        });
        const savedHotel = await hotel.save();
        hotelId = savedHotel._id;

        const room = new Room({
            title: 'Test Room',
            price: 100,
            maxPeople: 2,
            desc: 'A test room',
            roomNumber: 101
        });
        const savedRoom = await room.save();
        roomId = savedRoom._id;

        const user = new User({ fullName: 'Test User', email: `test${Date.now()}@example.com`, password: 'password123' });
        const savedUser = await user.save();
        userId = savedUser._id;

        // Generate a token for the user
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    }, 45000); // 45 seconds timeout

    afterEach(async () => {
        // Clean up the test database
        await mongoose.connection.db.dropDatabase();
    }, 45000); // 45 seconds timeout

    afterAll(async () => {
        // Close the connection
        await mongoose.connection.close();
    }, 45000); // 45 seconds timeout

    it('should create a new booking', async () => {
        const response = await request(app)
            .post('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send({ hotel: hotelId, user: userId, checkIn: '2025-03-01', checkOut: '2025-03-05', room: roomId, price: 200, guests: 2, bookedDaysCount: 4 });

        expect(response.status).toBe(201);
        expect(response.body.hotel).toBe(hotelId.toString());
        bookingId = response.body._id;
    }, 45000); // 45 seconds timeout

    it('should get bookings for a user', async () => {
        const response = await request(app)
            .get('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .query({ userId: userId });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 45000); // 45 seconds timeout

    it('should update a booking', async () => {
        const response = await request(app)
            .put(`/api/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ price: 250 });

        expect(response.status).toBe(200);
        expect(response.body.price).toBe(250);
    }, 45000); // 45 seconds timeout

    it('should delete a booking', async () => {
        const response = await request(app)
            .delete(`/api/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    }, 45000); // 45 seconds timeout
});