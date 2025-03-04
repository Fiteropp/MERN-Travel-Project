import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getAssignedHotels, getAllSearchHotels } from '../controllers/hotelController';
import Hotel from '../models/hotel';
import User from '../models/user';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

app.post('/api/hotels', createHotel);
app.put('/api/hotels/:id', updateHotel);
app.delete('/api/hotels/:id', deleteHotel);
app.get('/api/hotels/:id', getHotel);
app.get('/api/hotels', getAllHotels);
app.get('/api/assigned-hotels', getAssignedHotels);
app.get('/api/search-hotels', getAllSearchHotels);

describe('Hotel Controller', () => {
    let hotelId;
    let userId;

    beforeAll(async () => {
        // Connect to the test MongoDB server using the connection string from .env
        await mongoose.connect(process.env.TEST_DB_STRING);
    }, 45000); // 45 seconds timeout

    beforeEach(async () => {
        // Clean up the test database
        await mongoose.connection.db.dropDatabase();

        // Create a user for testing
        const user = new User({ name: 'Test User', email: `test${Date.now()}@example.com`, password: 'password123' });
        const savedUser = await user.save();
        userId = savedUser._id;

        // Create a hotel for testing
        const hotel = new Hotel({
            name: 'Test Hotel',
            address: '123 Test St',
            phoneNumber: 1234567890,
            city: 'Test City',
            desc: 'A test hotel',
            price: 100,
            location: 'Test Location',
            assignedModerators: [userId]
        });
        const savedHotel = await hotel.save();
        hotelId = savedHotel._id;
    }, 45000); // 45 seconds timeout

    afterAll(async () => {
        // Close the connection
        await mongoose.connection.close();
    }, 45000); // 45 seconds timeout

    it('should create a new hotel', async () => {
        const response = await request(app)
            .post('/api/hotels')
            .send({
                name: 'Test Hotel',
                address: '123 Test St',
                phoneNumber: 1234567890,
                city: 'Test City',
                desc: 'A test hotel',
                price: 100,
                location: 'Test Location',
                assignedModerators: [userId]
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Hotel');
        hotelId = response.body._id;
    }, 45000); // 45 seconds timeout

    it('should update a hotel', async () => {
        const response = await request(app)
            .put(`/api/hotels/${hotelId}`)
            .send({ name: 'Updated Hotel' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Hotel');
    }, 45000); // 45 seconds timeout

    it('should get a hotel by ID', async () => {
        const response = await request(app).get(`/api/hotels/${hotelId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(hotelId.toString());
    }, 45000); // 45 seconds timeout

    it('should get all hotels', async () => {
        const response = await request(app).get('/api/hotels');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 45000); // 45 seconds timeout

/*     it('should get assigned hotels for a moderator', async () => {
        const response = await request(app).get('/api/assigned-hotels').set('userId', userId);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 45000); // 45 seconds timeout*/

    it('should search hotels with filters', async () => {
        const response = await request(app).get('/api/search-hotels').query({ city: 'Test City', search: 'Hotel', minPrice: 50, maxPrice: 300 });

        expect(response.status).toBe(200);
        expect(response.body.hotels.length).toBe(1);
    }, 45000); // 45 seconds timeout

    it('should delete a hotel', async () => {
        const response = await request(app).delete(`/api/hotels/${hotelId}`);

        expect(response.status).toBe(200);
    }, 45000); // 45 seconds timeout
});