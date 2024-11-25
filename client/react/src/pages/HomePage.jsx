import client from "../assets/images/client.jpg";
import { FeaturedHotels } from "../components/FeaturedHotels";
import { Header } from "../components/Header";
function HomePage() {
  return (
    <>
      <Header />
      <FeaturedHotels />
      <section className="section_container">
        <div className="" reward_container>
          <p>100+ discount codes</p>
          <h4>Join reward and discover amazing discounts on your booking</h4>
          <button className="reward_btn">Join Rewards</button>
        </div>
      </section>
      <div className="section_container client_container">
        <h2 className="section_header">What our client say</h2>
        <div className="client_grid">
          <div className="client_card">
            <img src={client} alt="client" />
            <p>
              The booking process was seamless, and the confirmation was
              instant. I highly recommend Mern Hotel Booking for hassle-free
              hotel bookings.
            </p>
          </div>
          <div className="client_card">
            <img src={client} alt="client" />
            <p>
              The website provided detailed information about hotel, including
              amenities, photos, which helped me make an informed decision.
            </p>
          </div>
          <div className="client_card">
            <img src={client} alt="client" />
            <p>
              I was able to book a room within minutes, and the hotel exceeded
              my expectations. I appreciate Mern Hotel Booking efficiency and
              reliability.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { HomePage };
