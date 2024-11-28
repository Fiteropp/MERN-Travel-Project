import React from "react";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

function ModTabHotels() {

    const [hotelData, setHotelData] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/getassignedhotels`,{
                method: 'GET',
                credentials: 'include'
            }
                
            );
            const data = await response.json();
            setHotelData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };

        fetchUserData();
    }, []);


    return (
        <div>
            <h2>My Hotels</h2>
            {hotelData.length > 0 ? (
        hotelData.map((hotel) => (
          <div key={hotel._id} className="HotelElement">
            <div className="HotelElementContainer">
              <img
                className="HotelImage"
                src={hotel.img || 'https://picsum.photos/id/164/300/200'}
                alt={hotel.name || 'Hotel Image'}
              />
            </div>
            <div className="HotelElementText">
              <h2>{hotel.name || 'N/A'}</h2>
              <p>{hotel.location || 'N/A'}</p>
              <p>Description: <br /> {hotel.desc || 'N/A'}</p>
              <Button className="edit-button" variant="outlined">
                <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels assigned yet.</p>
      )}
        </div>
    )
}

export default ModTabHotels;