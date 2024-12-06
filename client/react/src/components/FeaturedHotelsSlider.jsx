import "../styles/HotelsSlider.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      <p className="price">{hotel.price}</p>
      <p>{hotel.desc}</p>
      <button>View Hotel</button>
    </div>
  ));

  return (
    <div className="Slider">
      <h1>Popular Hotels</h1>
      <Carousel infinite={true} responsive={responsive}>
        {hotels}
      </Carousel>
    </div>
  );
}
