import "./HotelDetails.css";
const HotelDetails = () => {
  return (
    <div>
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
          <img src="image1.jpg" alt="Hotel Image 1" />
          <img src="image2.jpg" alt="Hotel Image 2" />
          <img src="image3.jpg" alt="Hotel Image 3" />
        </div>
      </section>
      <section class="hotel-booking">
        <h2>Book Your Stay</h2>
        <form action="booking.html" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label for="checkin">Check-in Date:</label>
          <input type="date" id="checkin" name="checkin" required />

          <label for="checkout">Check-out Date:</label>
          <input type="date" id="checkout" name="checkout" required />

          <label for="guests">Number of Guests:</label>
          <input type="number" id="guests" name="guests" min="1" required />

          <button type="submit" class="booking-button">
            Book Now
          </button>
        </form>
      </section>
    </div>
  );
};

export { HotelDetails };
