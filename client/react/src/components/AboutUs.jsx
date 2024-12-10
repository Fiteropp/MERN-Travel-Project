import React from "react";
import mern_collage from "../assets/images/mern_collage.png";

export function AboutUs() {
  return <section className="about-us-container">
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
      </section>;
}
  