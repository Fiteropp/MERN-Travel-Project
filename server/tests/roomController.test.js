import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, getRoomsByHotel } from '../controllers/roomController';
import Room from '../models/room';
import Hotel from '../models/hotel';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

app.post('/api/hotels/:hotelid/rooms', createRoom);
app.put('/api/rooms/:id', updateRoom);
app.delete('/api/hotels/:hotelid/rooms/:id', deleteRoom);
app.get('/api/rooms/:id', getRoom);
app.get('/api/rooms', getRooms);
app.get('/api/hotels/:hotelid/rooms', getRoomsByHotel);

describe('Room Controller', () => {
    let hotelId;
    let roomId;

    beforeAll(async () => {
        console.log('Connecting to the test MongoDB server...');
        await mongoose.connect(process.env.TEST_DB_STRING);
        console.log('Connected to the test MongoDB server.');
    }, 60000); // 60 seconds timeout

    beforeEach(async () => {
        console.log('Cleaning up the test database...');
        await mongoose.connection.db.dropDatabase();
        console.log('Test database cleaned.');

        console.log('Creating a hotel for testing...');
        const hotel = new Hotel({
            name: 'Test Hotel',
            address: '123 Test St',
            phoneNumber: 1234567890, // Ensure phoneNumber is a number
            city: 'Test City',
            desc: 'A test hotel',
            price: 100,
            location: 'Test Location'
        });
        const savedHotel = await hotel.save();
        hotelId = savedHotel._id;
        console.log('Hotel created with ID:', hotelId);

        console.log('Creating a default room for testing...');
        const room = new Room({
            title: 'Default Room',
            price: 100,
            maxPeople: 2,
            desc: 'A default test room',
            roomNumber: 101,
            hotel: hotelId
        });
        const savedRoom = await room.save();
        roomId = savedRoom._id;
        console.log('Default room created with ID:', roomId);
    }, 60000); // 60 seconds timeout

    afterAll(async () => {
        console.log('Closing the connection to the test MongoDB server...');
        await mongoose.connection.close();
        console.log('Connection closed.');
    }, 60000); // 60 seconds timeout

    it('should create a new room', async () => {
        console.log('Creating a new room...');
        const response = await request(app)
            .post(`/api/hotels/${hotelId}/rooms`)
            .send({ title: 'Test Room', price: 100, maxPeople: 2, desc: 'A test room', roomNumber: 102 });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Test Room');
        console.log('Room created with ID:', response.body._id);
    }, 60000); // 60 seconds timeout

    it('should update a room', async () => {
        console.log('Updating the room...');
        const response = await request(app)
            .put(`/api/rooms/${roomId}`)
            .send({ title: 'Updated Room', price: 150, maxPeople: 3, desc: 'An updated test room', roomNumber: 102 });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Room');
        console.log('Room updated.');
    }, 60000); // 60 seconds timeout

    it('should get a room by ID', async () => {
        console.log('Getting the room by ID...');
        const response = await request(app).get(`/api/rooms/${roomId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(roomId.toString());
        console.log('Room retrieved.');
    }, 60000); // 60 seconds timeout

    it('should get all rooms', async () => {
        console.log('Getting all rooms...');
        const response = await request(app).get('/api/rooms');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        console.log('All rooms retrieved.');
    }, 60000); // 60 seconds timeout

    it('should get rooms by hotel ID', async () => {
        console.log('Getting rooms by hotel ID...');
        const response = await request(app).get(`/api/hotels/${hotelId}/rooms`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        console.log('Rooms by hotel ID retrieved.');
    }, 60000); // 60 seconds timeout

    it('should delete a room', async () => {
        console.log('Deleting the room...');
        const response = await request(app).delete(`/api/hotels/${hotelId}/rooms/${roomId}`);

        expect(response.status).toBe(200);
        console.log('Room deleted.');
    }, 60000); // 60 seconds timeout
});