//
import express from 'express';
import connectToDB from './config/db.js';
import hotelRoutes from './routes/hotelRoutes';

// Set up the Express app
const app = express();
const PORT = 3000;
connectToDB()// Start the server after successfully connecting to the database
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', hotelRoutes); // Mount router at /api

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


