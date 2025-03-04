import Hotel from "../models/hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
    //res.status(500).send({ message: err.message });
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
    //res.status(500).send({ message: err.message });
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
    //res.status(500).send({ message: err.message });
  }
};

export const getAssignedHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.find({ assignedModerators: req.userId });
    res.status(200).json(hotel);
    } catch (err) {
    next(err);
    //res.status(500).send({ message: err.message });
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
    //res.status(500).send({ message: err.message });
  }
};

export const getAllSearchHotels = async (req, res, next) => {
  try {
    const { 
      city,              // Filter by city
      sortBy = "name",   // Field to sort by (default is 'name')
      order = "asc",     // Sort order (default is ascending)
      search = "",       // Search by name substring
      page = 1,          // Current page (default is 1)
      limit = 10,        // Number of results per page (default is 10)
      minPrice,          // Minimum price filter
      maxPrice,          // Maximum price filter
      minRating,         // Minimum rating filter
      maxRating          // Maximum rating filter
    } = req.query;
    
    let query = {};
    
    // City filter
    if (city) query.city = city;
    
    // Search by name (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' }; 
    }
    
    // Price range filter. 
    // We use query operators $gte (greater than or equal) and $lte (less than or equal) for MongoDB
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Add rating range filter if provided
    // We use query operators $gte (greater than or equal) and $lte (less than or equal) for MongoDB
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = Number(minRating);
      if (maxRating) query.rating.$lte = Number(maxRating);
    }
    
    // Ensure page and limit are valid numbers and there is at least 1 page
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    
    // Build the sort object, using ternary if order is 'desc' = -1, else 1 = 'asc'
    const sort = {};
    sort[sortBy] = order === "desc" ? -1 : 1;
    
    // Pagination
    const skip = (pageNum - 1) * limitNum;
    
    // Fetch data with filtering, sorting, and pagination in parallel
    const [hotels, total] = await Promise.all([
      Hotel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Hotel.countDocuments(query)
    ]);
    // Send the response with hotels, pagination info, and total count
    res.status(200).json({
      hotels, // Array of hotels
      totalPages: Math.ceil(total / limitNum), // Total pages based on limit
      currentPage: pageNum,
      totalHotels: total // Total number of hotels matching the filters
    });
  } catch (err) {
    console.error("Error in getAllHotels:", err);
    next(err);
    //res.status(500).send({ message: err.message });
  }
};
