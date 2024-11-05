

//import hotel from "../models/hotel";

//const hotelController =  {
    /**
     * GET /api/hotels
     * Returns all hotels
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
/*    async getAllHotels(req, res, next) 
    {
        try 
        {
            const hotels = await hotel.find();
            res.status(200).json(hotels);
            next();
        } 
        catch(error) 
        {
            res.status(500).json({ message: 'Error fetching hotels', error });
        }
    },

    /**
     * POST /api/hotels
     * Adds a new hotel to the database
     * @param {import('express').Request} req - The request object containing hotel data in the body
     * @param {import('express').Response} res - The response object used to send back the added hotel or an error message
     */
  /*  async addHotel(req, res, next) 
    {
        try 
        {
            const newHotel = new hotel(req.body);
            await newHotel.save();
            res.status(201).json(newHotel);
            next();
        }
        catch(error)
        {
            res.status(500).json({message: "Error adding hotel", error});
        }
    },
    /**
     * PUT /api/hotels/:name
     * Updates a hotel with new values
     * @param {import('express').Request} req - The request object containing the hotel data in the body and the hotel name in the params
     * @param {import('express').Response} res - The response object used to send back the updated hotel or an error message
     */
 /*   async updateHotel(req, res, next)
    {
        try
        {
            // findOneAndUpdate: Atomically finds a document matching the filter, updates it with the update query, and returns the updated document.
            // Parameters: 
            //   - filter (optional query to find the document to update)
            //   - update (optional update query to apply to the found document)
            //   - options (optional query options)
            const updatedHotel = await hotel.findOneAndUpdate({name: req.params.name}, req.body, {new: true});
            if (!updatedHotel) 
            {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            res.json(updatedHotel);
            next();
        }
        catch(error)
            {
                res.status(500).json({message: "Error updating hotel", error});
            }
    },
    /**
     * DELETE /api/hotels/:name
     * Deletes a hotel from the database
     * @param {import('express').Request} req - The request object containing the hotel name in the params
     * @param {import('express').Response} res - The response object used to send a success message or an error message
     */
/*    async deleteHotel(req, res, next)
    {
        try
        {
            // findOneAndDelete: Finds and deletes a document in a single operation, returning the deleted document or null.
            // Parameters:
            // -filter: query to find the document to delete
            // -options: additional query options.
            const deletedHotel = await hotel.findOneAndDelete({name: req.params.name});
            if (!deletedHotel) 
            {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            res.status(204).json({ message: 'Hotel deleted successfully' });
            next();
        }
        catch(error)
        {
            res.status(500).json({message: "Error deleting hotel", error});
        }
    }
}

export default hotelController;*/