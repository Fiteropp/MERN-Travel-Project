import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/HotelDetails.css";
import { useNavigate, Link } from "react-router-dom";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
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
    <div className="hotel-details">
      <h4>{hotelDetails.name}</h4>
      <section className="hotel-description">
        <h2>{hotelDetails.rating}-rating</h2>
        <p>{hotelDetails.desc}</p>
      </section>
      <section className="hotel-price">
        <h2>Price</h2>
        <p>{hotelDetails.price} Euros</p>
      </section>
      <section className="hotel-images">
        <h2>Images</h2>
        <div className="image-gallery">
          <img src={hotelDetails.image} alt="Hotel Image 1" />
        </div>
      </section>
      <section className="hotel-booking">
        <h2>Book Your Stay</h2>
        <Link to={`/booking-form/${id}`}>
        <button
          type="submit"
          class="booking-button"
        >
          Book Now
        </button>
        </Link>
      </section>
    </div>
  );
};

export { HotelDetails };
