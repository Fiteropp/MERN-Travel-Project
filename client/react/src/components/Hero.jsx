import React, { useEffect, useState } from "react";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import "..//styles/Hero.css"

export const Hero = () => {
  const images = [hero1, hero2, hero3];
  const [currentImage, setCurrentImage] = useState(0);
  const [isBlurring, setIsBlurring] = useState(false); /**/

  useEffect(() =>{
    const interval = setInterval(() =>{
      setCurrentImage((prev)=> (prev + 1) %images.length);

    }, 5000);
    return () => clearInterval(interval);
  },[images.length]);

  return (
    <div>
      <header 
      className="section_container header_container"
      style={{
        backgroundImage: `url(${images[currentImage]})`
      }}
      >
      <div className="header_content">
      <h1>Enjoy Your Dream Vacation</h1>
      <p>Book Hotels at lowest prices</p>
    </div>
  </header>
</div>
);
};