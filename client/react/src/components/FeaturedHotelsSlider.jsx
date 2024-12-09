import "../styles/HotelsSlider.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import location_svg from "../assets/Icons/location-sign-svgrepo-com.svg"

import { useEffect, useState } from 'react';
import { responsive } from "./responsive";





export default function FeaturedHotelsSlider() {
  
  const [hotelData, setHotelData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/gethotels`,{
            method: 'GET'
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
  
const hotels = hotelData.map((hotel) => (
  <div key={hotel._id} className="card1">
      <img className="product--image" src={hotel.image} alt="product image" />
      <h2 className="header">{hotel.name}</h2>
      <p>{hotel.desc}</p>
      <div className="smllcnt">
      <h3 className="city"><img className="city-logo" src={location_svg} alt="" />{hotel.city}</h3>
      <h3 className="price">{hotel.price} €</h3>
      </div>
    
      <button>View Hotel</button>
    </div>
  ));

  return (
    <div className="Slider">
      <h5>Popular Hotels</h5>
      <h1>Find the best</h1>
      <Carousel infinite={true} responsive={responsive}>
        {hotels}
      </Carousel>
    </div>
  );
}
