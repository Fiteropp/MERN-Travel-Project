import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import location_svg from "../assets/Icons/location-sign-svgrepo-com.svg"
import axios from "axios";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
  CardMedia,
  Rating
} from "@mui/material";

import "../styles/HotelSearch.css"

const HotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);

  const fetchHotels = async () => {
    try {
      const params = {
        city: city || undefined,
        sortBy: sortBy || undefined,
        order: order || undefined,
        search: search || undefined,
        page: page,
        limit: 10,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        minRating: minRating || undefined,
        maxRating: maxRating || undefined
      };
      
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/searchhotels`, { params });
      // fail-safe check if response won't get data from server
      setHotels(response.data.hotels || []);
      console.log(response.data.hotels);
      setTotalPages(response.data.totalPages);
      setTotalHotels(response.data.totalHotels);
    } catch (err) {
      setError("Error fetching hotels");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [city, sortBy, order, search, page, minPrice, maxPrice, minRating, maxRating]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  

  const resetFilters = () => {
    setSearch("");
    setCity("");
    setSortBy("name");
    setOrder("asc");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setMaxRating("");
    setPage(1);
  };

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    
  <div className="hotelSearchPageContainer" >
     <section className="topSection">
      <div className="hotelSearchHeaderCont">
        <h5>Find The Best Hotel For You</h5>
        <h1 className="hotelSearchHeader"> Hotels Search </h1>
      </div>
      
     
    <div className="topFilters">
      
      <div className="topSearch">
        {/* Search by Name */}
        <TextField sx={{ m: 1 }}
            fullWidth
            className="topSearchBar"
            label="Search by Name"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>
      
      <div className="topSort">
            
            {/* Sort By */}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
              <Select 
                label="Sort By"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          

          {/* Order */}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>Order</InputLabel>
              <Select 
                label="Order"
                value={order} 
                onChange={(e) => setOrder(e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
      </div>
    </div>

    
     
     </section>
    
    <div className="hotelsSearchContainer">

      <div className="filters">
          
        

        {/* City Filter */}
        
          <FormControl className="search-input" fullWidth>
            <InputLabel>City</InputLabel>
            <Select 
              label="City"
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            >
              <MenuItem value="">All Cities</MenuItem>
              <MenuItem value="Budapest">Budapest</MenuItem>
              <MenuItem value="Tokyo">Tokyo</MenuItem>
              <MenuItem value="Arusha">Arusha</MenuItem>
              <MenuItem value="Sydney">Sydney</MenuItem>
              <MenuItem value="Cancún">Cancún</MenuItem>
            </Select>
          </FormControl>
        

        
        
        <div className="filterRow">
            {/* Price Range*/}

            <TextField className="search-input"
              label="Min Price"
              type="number"
              variant="outlined"
              fullWidth
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          
          
            <TextField className="search-input"
              label="Max Price"
              type="number"
              variant="outlined"
              fullWidth
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>
        
        <div className="filterRow">
          { /* Rating Range */}
          
            <TextField className="search-input"
              label="Min Rating"
              type="number"
              variant="outlined"
              fullWidth
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          
            <TextField className="search-input"
              label="Max Rating"
              type="number"
              variant="outlined"
              fullWidth
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
            />
        </div>

       
        
      <div className="filterRow">
        {/* Action Buttons */}
          
            <Button 
              className="edit-button-contained"
              variant="contained" 
              color="primary" 
              onClick={fetchHotels}
            >
              Search
            </Button>
          
            <Button 
              className="edit-button"
              variant="outlined" 
              color="secondary" 
              onClick={resetFilters}
            >
              Reset Filters
            </Button>

      </div>
        
            {/* Total Hotels Information */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Total Hotels Found: {totalHotels}
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
      </div>
        

        

      
      
      
      <div className="hotelsCards">
        
        {/* Hotels Grid2 */}
        <div>
        {(Array.isArray(hotels) ? hotels : []).map((hotel) => (
        <div key={hotel._id} className="hotelCardDiv">
          <Link to={`/hotel/${hotel._id}`} className="hotelCard">
            <div className="hotelImgCont">
              {hotel.image && (
                <img
                  className="hotelImg"
                  src={hotel.image}
                  alt={hotel.name}/>
              )}

            </div>
            <div className="hotelInfo" >
                <h3 className="hotelName" >{hotel.name}</h3>
                <div className="hotelCityCont">
                  <img className="city-logo" src={location_svg} alt="" />
                  <p className="hotelCity"> {hotel.city}</p>
                </div>
                <div className="hotelPriceAndRating">
                  <p className="hotelPrice"> {hotel.price} €</p>
                  <div className="hotelRating">
                    <Rating
                      precision={0.25}
                      value={hotel.rating}
                      readOnly
                    />
                    <p > {hotel.rating}/5</p>
                  </div>
                </div>
                
                
                <p className="hotelDescription" >{hotel.desc}</p>
              </div>
          </Link>
        </div>
      ))}
    </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary"
          />
        </Box>
      )}

      </div>
      </div>
      

  </div>  
  )}

export { HotelSearch };
