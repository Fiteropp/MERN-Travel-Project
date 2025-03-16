import React from "react";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../paymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// need to redo whole file after deployment
function UserTabBookingHistory() {

    const [bookingData, setBookingData] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState({});
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        const fetchBookingsData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/bookings`, { withCredentials: true });
      
            setBookingData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };

        fetchBookingsData();
    }, []);

    const DeleteBooking = async (bookingID) => {
      try {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/delbooking/${bookingID}`, { withCredentials: true });
          console.log(response.data);
          // Remove the deleted booking from the state
          setBookingData(bookingData.filter(booking => booking._id !== bookingID));
      } catch (error) {
          console.error("Error deleting booking:", error);
      }
  }
    const handlePaymentForm = (booking) => {
        setSelectedBooking(booking);
        setShowPaymentForm(true);
    };


    return (
        <div>
            <h2>My Bookings</h2>
            {bookingData.length > 0 ? (
    bookingData.map((bookings) => (
        <div key={bookings._id} className="HotelElement">
            <div className="HotelElementContainer">
                <img
                    className="HotelImage"
                    src={bookings.hotel?.image || 'default-hotel.jpg'}
                    alt={bookings.hotel?.name || 'Hotel'}
                />
            </div>
            <div className="HotelElementText">
                <h2>Hotel: {bookings.hotel?.name || 'N/A'}</h2>
                <h4>Room: {bookings.room?.title || 'N/A'}</h4>
                <p>Check-In: {new Date(bookings.checkIn).toLocaleDateString()}</p>
                <p>Check-Out: {new Date(bookings.checkOut).toLocaleDateString()}</p>
                
                <h3>Price: {bookings.price || 'N/A'} €</h3>
                <Button variant="outlined" color="primary" onClick={() => handlePaymentForm(bookings)}>
                Pay Now
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => DeleteBooking(bookings._id)}>
                Delete Booking
                </Button>
            </div>
        </div>
    ))
) : (
    <p>No bookings found.</p>
)}
{showPaymentForm && selectedBooking && (
    <Elements stripe={stripePromise}>
        <PaymentForm bookingId={selectedBooking._id} price={selectedBooking.price} />
    </Elements>
)}
        </div>
    )
}

export default UserTabBookingHistory;