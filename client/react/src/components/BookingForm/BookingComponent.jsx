import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { use } from 'react';
import './../../styles/HotelDetails.css';



export const BookingComponent = () => {
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [maxGuests, setMaxGuests] = useState(1);
    const [user, setUser] = useState(null);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`, { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/getroomsbyhotel/${id}`);
                setRooms(response.data);

                if (response.data.length > 0) {
                    setRoom(response.data[0]._id); // Set default room
                    setMaxGuests(response.data[0].maxPeople);
                    setPrice(response.data[0].price);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, [id]);

    const handleChange = (event) => {
        const selectedRoomId = event.target.value;
        setRoom(selectedRoomId);
        const selectedRoom = rooms.find(r => r._id === selectedRoomId);
        if (selectedRoom) {
            setMaxGuests(selectedRoom.maxPeople);
            setPrice(selectedRoom ? selectedRoom.price : 0);
        }
    };

    const handleBooking = async () => {
        try {
            const bookingData = {
                user: user.id,
                hotel: id,
                room: room,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                maxGuests: maxGuests,
                price: price
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/bookings`, bookingData, { withCredentials: true });
            navigate("/", { state: { message: "Booking created successfully!", bookingId: response.data._id } });
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="booking-date-pickers">
                    <Box sx={{ width: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Room</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={room}
                                label="Room"
                                onChange={handleChange}
                            >
                                {rooms.map((room) => (
                                    <MenuItem key={room._id} value={room._id}>{room.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <DatePicker label="Check In" sx={{ width: '50%' }} value={checkInDate} onChange={(newValue) => setCheckInDate(newValue)} />
                    <DatePicker label="Check Out" sx={{ width: '50%' }} value={checkOutDate} onChange={(newValue) => setCheckOutDate(newValue)} />
                    <TextField
                        label="Max Guests"
                        type="number"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        inputProps={{ min: 1, max: maxGuests }}
                        sx={{ width: '50%' }}
                    />
                    <section className="hotel-price">
                                  <h5>Price per night</h5>
                                  <p>{price} €</p>
                                  
                                  <button
                                    type="submit"
                                    className="booking-button"
                                    onClick={handleBooking}
                                  >
                                    Book Now
                                  </button>
                                  
                    </section>
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default BookingComponent;


