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
import { useUser } from "./../../contexts/UserContext"; // Import UserContext
import { useAlert } from '../../contexts/AlertContext';
import dayjs from 'dayjs';




export const BookingComponent = () => {
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [checkInDate, setCheckInDate] = useState(dayjs());
    const [checkOutDate, setCheckOutDate] = useState(dayjs().add(2, 'day'));
    const [guests, setGuests] = useState(1);
    const [maxGuests, setMaxGuests] = useState(1);
    const { user, setUser, loading } = useUser(); 
    const [pricePerNight, setPricePerNight] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [nightsCount, setNightsCount] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const { showAlert } = useAlert(); 

    

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/getroomsbyhotel/${id}`);
                setRooms(response.data);

                if (response.data.length > 0) {
                    const firstRoom = response.data[0];
                    setRoom(firstRoom._id);
                    setMaxGuests(firstRoom.maxPeople);
                    setPricePerNight(firstRoom.price);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
                showAlert("Error fetching rooms", "error");
            }
        };
        fetchRooms();
    }, [id]);

    useEffect(() => {
        if (checkInDate && checkOutDate && pricePerNight) {
            const nights = checkOutDate.diff(checkInDate, 'day');
            setNightsCount(nights);
            setCalculatedPrice(pricePerNight * nights);
        }
    }, [checkInDate, checkOutDate, pricePerNight]); 

    useEffect(() => {
        if (guests < 1 || guests > maxGuests || !Number.isInteger(guests)){
            setGuests(1);
        }
    }, [guests, maxGuests])

    const handleChange = (event) => {
        const selectedRoomId = event.target.value;
        setRoom(selectedRoomId);
        const selectedRoom = rooms.find(r => r._id === selectedRoomId);
        if (selectedRoom) {
            setMaxGuests(selectedRoom.maxPeople);
            setPricePerNight(selectedRoom.price);
            setGuests(selectedRoom.maxPeople);
        }
    };

    const handleBooking = async () => {
        if (!user) {
            console.warn("User not logged in");
            showAlert("Please Login Or Register", "warning");
            return;
        }
        if (!checkInDate.isBefore(checkOutDate)) {
            showAlert("Check In Date must be before Check Out Date", "warning");
            console.warn("Check In Date must be before Check Out Date");
            setCheckInDate(dayjs());
            return;
        }
        if (!Number.isInteger(guests)) {
            console.warn("Guests Value Should Be An Interger")
            return
        }
        try {
            const bookingData = {
                user: user._id,
                hotel: id,
                room: room,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                price: calculatedPrice,
                guests: guests,
                bookedDaysCount: nightsCount
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/bookings`, bookingData, { withCredentials: true });
            showAlert("Booking Succsessfully Created!", "succsess");
            
        } catch (error) {
            console.error("Error creating booking:", error);
            showAlert("Error creating booking", "error");
        }
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="booking-date-pickers">
                    <Box sx={{ width: 1 , marginTop:2}}>
                        <FormControl fullWidth>
                            <InputLabel id="room-select-label">Room</InputLabel>
                            <Select
                                labelId="room-select-label"
                                id="room-select"
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

                    <Box sx={{ width: 1, marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <DatePicker label="Check In" sx={{ width: '50%' }} value={checkInDate} onChange={setCheckInDate} />
                        <DatePicker label="Check Out" sx={{ width: '50%' }} value={checkOutDate} onChange={setCheckOutDate} />
                    </Box>
                    
                    <TextField
                        label="Guests"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        inputProps={{ min: 1, max: maxGuests }}
                        sx={{ width: 1, marginBottom: 2 }}
                    />
                    <section className="hotel-price">
                        <h5>Price per night</h5>
                        <p>{pricePerNight}€ x {nightsCount} nights </p>
                        <h5>Final Price</h5>
                        <p>{calculatedPrice} €</p>
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


