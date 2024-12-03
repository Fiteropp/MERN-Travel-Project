import "../styles/HotelDetails.css";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
const HotelDetails = () => {
  return (
    <div class="hotel-details">
      <h4>Hotel Kämp</h4>
      <section class="hotel-description">
        <h2>5-star</h2>
        <p>
          Hotel Kämp offers 179 spacious rooms including 15 luxurious suites,
          combining historical charm with modern amenities, hotel features a
          variety of services including the Kämp Spa which offers a relaxing
          oasis above the rooftops of Helsinki.
        </p>
      </section>
      <section class="hotel-price">
        <h2>Price</h2>
        <p>$280 per night</p>
      </section>
      <section class="hotel-images">
        <h2>Images</h2>
        <div class="image-gallery">
          <img src={image1} alt="Hotel Image 1" />
          <img src={image2} alt="Hotel Image 2" />
          <img src={image3} alt="Hotel Image 3" />
        </div>
      </section>
      <section class="hotel-booking">
        <h2>Book Your Stay</h2>
        <button type="submit" class="booking-button">
          Book Now
        </button>
      </section>
    </div>
  );
};

export { HotelDetails };
