import React, { useEffect, useRef } from "react";
import "../styles/ClientsContainer.css";

export function ClientsContainer({ client }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    function scrollSlider() {
      scrollAmount += 1;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0; 
      }
      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
    }

    const interval = setInterval(scrollSlider, 20); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="client_slider_container">
      <h2 className="section_header">What our clients say</h2>
      <div className="client_slider" ref={sliderRef}>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">The booking process was seamless, and the confirmation was instant. Highly recommend!</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">The website provided detailed hotel information, including amenities and photos.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">I was able to book a room within minutes, and the hotel exceeded my expectations.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">The service was excellent! I would definitely use this platform again for my bookings.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">Fantastic platform with a user-friendly interface and reliable service.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">The booking process was seamless, and the confirmation was instant. Highly recommend!</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client} alt="client" />
          <p className="client_feedback">The website provided detailed hotel information, including amenities and photos.</p>
        </div>
      </div>
    </div>
  );
}
