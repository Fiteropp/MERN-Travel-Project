import React, { useEffect, useRef } from "react";
import "../styles/ClientsContainer.css";

import client0 from "../assets/images/client0.jpg"; //New pictures
import client1 from "../assets/images/client1.jpg";
import client2 from "../assets/images/client2.jpg";
import client3 from "../assets/images/client3.jpg";
import client4 from "../assets/images/client4.jpg";
import client5 from "../assets/images/client5.jpg";
import client6 from "../assets/images/client6.jpg";
import client7 from "../assets/images/client7.jpg";
import client8 from "../assets/images/client8.jpg";

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
          <img className="client-img" src={client0} alt="client" />
          <p className="client_feedback">The booking process was seamless, and the confirmation was instant. Highly recommend!</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client1} alt="client" />
          <p className="client_feedback">The website provided detailed hotel information, including amenities and photos.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client2} alt="client" />
          <p className="client_feedback">I was able to book a room within minutes, and the hotel exceeded my expectations.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client3} alt="client" />
          <p className="client_feedback">The service was excellent! I would definitely use this platform again for my bookings.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client4} alt="client" />
          <p className="client_feedback">Fantastic platform with a user-friendly interface and reliable service.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client5} alt="client" />
          <p className="client_feedback">I found website so easy to navigate and book my trip. The functionalities made my planning process smooth and enjoyable.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client6} alt="client" />
          <p className="client_feedback">The website is incredibly user-friendly and visually appealing. </p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client7} alt="client" />
          <p className="client_feedback">The trip was well-organized, and every detail was taken care of.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client8} alt="client" />
          <p className="client_feedback">The travel agency helped me plan a perfect vacation, and their staff was always there to answer my questions.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client8} alt="client" />
          <p className="client_feedback">The travel agency helped me plan a perfect vacation, and their staff was always there to answer my questions.</p>
        </div>
        <div className="client_card">
          <img className="client-img" src={client8} alt="client" />
          <p className="client_feedback">The travel agency helped me plan a perfect vacation, and their staff was always there to answer my questions.</p>
        </div>
      </div>
    </div>
  );
}
