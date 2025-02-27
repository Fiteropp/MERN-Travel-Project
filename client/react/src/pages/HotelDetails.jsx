import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { Rating } from "@mui/material";
import { BookingComponent } from "../components/BookingForm/BookingComponent";

import location_svg from "../assets/Icons/location-sign-svgrepo-com.svg"
import "../styles/HotelDetails.css";



const HotelDetails = () => {
  const navigate = useNavigate();
  /* Get the id from the params */
  const { id } = useParams();
  /*const handleBookingClick = () => {
    navigate(`/booking-form/${id}`); // Redirect to booking form with hotel ID
  };*/

  /* State to hold hotel details */
  const [hotelDetails, setHotelDetails] = useState(null);
  /* Fetch the details of the single hotel using the id */
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/findhotel/${id}`
        );
        const data = await response.json();
        setHotelDetails(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotelDetails();
  }, [id]);
  if (!hotelDetails) {
    return <div>Loading...</div>;
  }
  /* Use the details of single hotel to populate the data below */
  return (
    <div className="hotel-details-container">
        <div className="hotel-details">
      
          <section className="hotel-images">
            <img src={hotelDetails.image} alt="Hotel Image 1" />
          </section>
          
          <section className="hotel-rating-and-desc">
              <div>
                <h1 className="hotel-header">{hotelDetails.name}</h1>
                
                <div className="hotel-rating-cont">
                  <div className="hotel-rating">
                    <Rating
                    precision={0.25}
                    value={hotelDetails.rating}
                    readOnly
                  />
              
                  <p>{hotelDetails.rating} /5</p>
                  </div>

                    <div className="hotel-city">
                      <img className="city-logo" src={location_svg} alt="" />
                        <p>{hotelDetails.city}</p>
                    </div>
                </div>
              </div>
          </section>

          <section className="hotel-info">

              <section className="hotel-description">
                  <div>
                    <h2 className="hotel-element-header">Description:</h2>
                    <p>{hotelDetails.desc}</p>
                  </div>
                  
                  <div className="hotel-contacts">
                      <h2 className="hotel-element-header">Contact Information</h2>
                      <h5>Hotel Phone Number:   </h5> 
                      <span> +{hotelDetails.phoneNumber}</span>
                      <h5>Address:  </h5>
                      <span> {hotelDetails.address}</span>
                  </div>
            </section>

            <section className="hotel-booking">
              <h2>Book Your Stay</h2>
              <BookingComponent />
            </section>
            
          </section>
        </div> 
    </div>
    
    
  );
};

export { HotelDetails };
