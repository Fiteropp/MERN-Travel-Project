//
import express from 'express';
import connectToDB from './config/db.js';
import hotelsRoute from './routes/hotelsRoute.js';

// Set up the Express app
const app = express();
const PORT = 3000;
connectToDB()// Start the server after successfully connecting to the database
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', hotelsRoute); // Mount router at /api

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


