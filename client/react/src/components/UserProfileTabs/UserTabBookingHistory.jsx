import React from "react";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';


// need to redo whole file after deployment
function UserTabBookingHistory() {

    const [bookingData, setBookingData] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/bookings`,{
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setBookingData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };

        fetchUserData();
    }, []);


    return (
        <div>
            <h2>My Bookings</h2>
            {bookingData.length > 0 ? (
        bookingData.map((bookings) => (
          <div key={bookings._id} className="HotelElement">
            <div className="HotelElementContainer">
              <img
                className="HotelImage"
                src={bookings.hotel || 'Hotel Image'}
              />
            </div>
            <div className="HotelElementText">
              <h2>{bookings.checkIn || 'N/A'}</h2>
              <p>{bookings.checkOut || 'N/A'}</p>
              <p>Room: <br /> {bookings.room || 'N/A'}</p>

            </div>
          </div>
        ))
      ) : (
        <p>No bookings assigned yet.</p>
      )}
        </div>
    )
}

export default UserTabBookingHistory;