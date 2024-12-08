import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
  CardMedia
} from "@mui/material";

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
      
      const response = await axios.get("http://localhost:8080/api/hotels", { params });
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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Hotel Search
      </Typography>

      <Grid container spacing={3} alignItems="center">
        {/* Search by Name */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        {/* City Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select 
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
        </Grid>

        {/* Sort By */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Order */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Order</InputLabel>
            <Select 
              value={order} 
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            fullWidth
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Max Price"
            type="number"
            variant="outlined"
            fullWidth
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Grid>

        {/* Rating Range */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Min Rating"
            type="number"
            variant="outlined"
            fullWidth
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Max Rating"
            type="number"
            variant="outlined"
            fullWidth
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} container spacing={2}>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={fetchHotels}
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>

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

      {/* Hotels Grid */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/*check if hotels is an array of objects. Just for my sake + another fail-safe*/}
        {(Array.isArray(hotels) ? hotels : []).map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id} 
          onClick={() => handleHotelClick(hotel._id)} style={{ cursor: "pointer" }} >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {hotel.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.image}
                  alt={hotel.name}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography>City: {hotel.city}</Typography>
                <Typography>Location: {hotel.location}</Typography>
                <Typography>Price: ${hotel.price}</Typography>
                <Typography>Rating: {hotel.rating}/5</Typography>
                <Typography variant="body2">{hotel.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
    </Box>
  );
};

export { HotelSearch };
