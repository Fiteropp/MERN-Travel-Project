import { AboutUs } from '../components/AboutUs';
import client from "../assets/images/client.jpg";
import { FeaturedHotels } from "../components/FeaturedHotels";
import HotelsSlider from "../components/FeaturedHotelsSlider";
import { Header } from "../components/Header";
import "../styles/HomePage.css";


function HomePage() {
  return (
    <>
      <Header />
      <AboutUs />
      <HotelsSlider />
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

    function AboutUsContainer({mern_collage}) {
      return (<section className="about-us-container">
          <div className="feature-photo">
            <img src={mern_collage} alt="" />
          </div>
          <div className="about-section">
              <h5>About Us</h5>
              <h2>Plan Your Ideal Trip</h2>
              <p>At our Travel Agency, we believe that travel is more than just a destination 
                it's a journey of discovery, adventure, and cherished memories. 
                Founded on a passion for exploring the world, we are dedicated to 
                curating extraordinary travel experiences that cater to your unique dreams and aspirations.</p>
          </div>
      </section>);
    }
  