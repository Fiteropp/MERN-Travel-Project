import express from 'express';
import hotelController from '../controllers/hotelController';
// Create a router object
const router = express.Router();
// Define routes on the router
router.get('/hotels', hotelController.getAllHotels);
// these routes will require Admin reights to access at some point
router.post('/hotels', hotelController.addHotel);
router.put('/hotels/:name', hotelController.updateHotel);
router.delete('/hotels/:name', hotelController.deleteHotel);
// Export the router to use in the main app
export default router;