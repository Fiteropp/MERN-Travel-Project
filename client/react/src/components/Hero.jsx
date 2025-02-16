import React, { useEffect, useState } from "react";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero.jpg";
import "..//styles/Hero.css"

export const Hero = () => {
  const images = [hero1, hero2, hero3, hero4];
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); //

  useEffect(() =>{
    const interval = setInterval(() =>{
      setIsAnimating(true); //
      setTimeout(() => { //
      setCurrentImage((prev)=> (prev + 1) %images.length);
      setIsAnimating(false); //
      }, 4000); // Время анимации = 4 секунды

    }, 5000);
    return () => clearInterval(interval);
  },[images.length]);

  return (
    <div>
      <header 
      //className="section_container header_container"//
      className={`section_container header_container ${isAnimating ? "animated" : ""}`}
      style={{
        backgroundImage: `url(${images[currentImage]})`
      }}
      >
      <div className="header_contentHero">
      <h2>Enjoy Your Dream Vacation</h2>
      <p>Book Hotels at lowest prices</p>
    </div>
  </header>
</div>
);
};