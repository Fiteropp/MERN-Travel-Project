import { Link } from "react-router-dom";
import hotel from "../assets/images/hotel.jpg";
import { useEffect, useState } from "react";
const FeaturedHotels = () => {
  /*fetch hotels from backend api*/
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/hotels`
        );

        if (!response.ok) {
          throw new Error("Error fetching the requests");
        }

        const hotels = await response.json();

        setHotels(hotels);
      } catch (error) {
        console.log(error.message);
      }
    };
    getHotels();
  }, []);

  return (
    <section className="section_container popular_container">
      <h2 className="section_header">Popular Hotels</h2>
      <div className="popular_grid">
        {/* render the list of hotels */}
        {hotels.map((hotel, i) => (
          <div className="popular_card">
            <img src={hotel.image} alt="hotel" />
            <div className="popular_content">
              <div className="popular_card_header">
                <h4>{hotel.name}</h4>
                <h4>{hotel.price} euro</h4>
              </div>
              <p>{hotel.address}</p>
              <Link to={`/details/${hotel._id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export { FeaturedHotels };
