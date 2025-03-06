import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { Rating } from "@mui/material";
import { BookingComponent } from "../components/BookingForm/BookingComponent";

import location_svg from "../assets/Icons/location-sign-svgrepo-com.svg"
import "../styles/HotelDetails.css";


import HotelImages from "../components/HotelPageImages";


const HotelDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  

  const [hotelDetails, setHotelDetails] = useState(null);

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


  return (
    <div className="hotel-details-container">
      <div className="hotel-details">

        <HotelImages hotelDetails={hotelDetails} />


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
