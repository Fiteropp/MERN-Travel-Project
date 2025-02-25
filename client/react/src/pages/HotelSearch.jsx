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
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { IoIosArrowDown } from "react-icons/io";



import "../styles/HotelSearch.css"

const HotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMaxPriceSlider, setMinMaxPriceSlider] = useState([0, 500])
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [minMaxRatingSlider, setMinMaxRatingSlider] = useState([0, 5])
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(window.innerWidth >= 768);

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
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (width < 768) {
      setExpanded(false); 
    }
  }, [width]); 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleMinPriceChange = (event) => {
    const value = Number(event.target.value);
    setMinPrice(value);  // Update minPrice
    setMinMaxPriceSlider([value, maxPrice]);
};

const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value);
    setMaxPrice(value);  // Update maxPrice
    setMinMaxPriceSlider([minPrice, value]);
};

const handlePriceSliderChange = (event, newPriceValue) => {
  setMinMaxPriceSlider(newPriceValue);
  setMinPrice(newPriceValue[0])
  setMaxPrice(newPriceValue[1])
}

const handleMinRatingChange = (event) => {
  const value = Number(event.target.value);
  setMinRating(value);  // Update minPrice
  setMinMaxRatingSlider([value, maxPrice]);
};

const handleMaxRatingChange = (event) => {
  const value = Number(event.target.value);
  setMaxRating(value);  // Update maxPrice
  setMinMaxRatingSlider([minPrice, value]);
};

const handleRatingSliderChange = (event, newPriceValue) => {
setMinMaxRatingSlider(newPriceValue);
setMinRating(newPriceValue[0])
setMaxRating(newPriceValue[1])
}
  

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
      
      <Box className="topSearch">
        {/* Search by Name */}
        <TextField sx={{ width: '100%' }}
            fullWidth
            className="topSearchBar"
            label="Search by Name"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </Box>
      
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

      <Box sx={{width: '95%'}} className="filters">
      <Accordion sx={{width: 'auto', boxShadow:'none', }} defaultExpanded={expanded}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h3 style={{margin: "0px"}}>Filters</h3>
        </AccordionSummary>
        <AccordionDetails>
          {/* City Filter */}
        <div className="filterGroup">
          <p className="filterName">City</p>
          <hr />
          <FormControl className="search-input" fullWidth>
              <InputLabel>City</InputLabel>
              <Select 
                label="City"
                value={city} 
                variant="filled"
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
            
        </div>

       
        
        <div className="filterGroup">
            <p className="filterName">Price</p>
            <hr />
              <Slider
            getAriaLabel={() => 'Temperature range'}
            value={minMaxPriceSlider}
            sx={{ color: '#276968' }}
            onChange={handlePriceSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={350}
            step={10}
          />

            <div className="priceFilterRow">
                {/* Price Range*/}

                <TextField className="search-input"
                  label="Min"
                  type="number"
                  variant="filled"
                  size="small"
                  inputProps={{step:10}}
                  fullWidth
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              
              
                <TextField className="search-input"
                  label="Max"
                  type="number"
                  variant="filled"
                  size="small"
                  inputProps={{step:10}}
                  fullWidth
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
            </div>
           
        </div>
        
       

        <div className="filterGroup">
        
        <p className="filterName">Rating</p>
          <hr />  

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={minMaxRatingSlider}
            sx={{ color: '#276968' }}
            onChange={handleRatingSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={0.1}
            defaultValue={[0,5]}
          />
        
        <div className="priceFilterRow">
          { /* Rating Range */}
          
            <TextField className="search-input"
              label="Min"
              type="number"
              variant="filled"
              fullWidth
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={minRating}
              onChange={handleMinRatingChange}
            />
          
            <TextField className="search-input"
              label="Max"
              type="number"
              variant="filled"
              fullWidth
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={maxRating}
              onChange={handleMaxRatingChange}
            />
        </div>
        </div>

       
        
      <div className="filterRow">
        {/* Action Buttons */}
          
            <Button 
              className="edit-button-contained"
              variant="contained" 
              color="primary" 
              onClick={fetchHotels}
              fullWidth
            >
              Search
            </Button>
          
            <Button 
              className="edit-button"
              variant="outlined" 
              color="secondary" 
              onClick={resetFilters}
              fullWidth
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
        </AccordionDetails>
      </Accordion>    
      </Box>
        

        

      
      
      
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
