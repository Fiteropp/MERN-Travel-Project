import "../styles/Navigation.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  
  const location = useLocation(); // Get the current route
  const [scroll, setScroll] = useState(0);
  const [className, setClassName] = useState("navbar");

  const handleScroll = () => setScroll(window.scrollY);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Set class name dynamically based on scroll and route
    if (location.pathname === "/") {
      setClassName(scroll > 540 ? "navbar navbar-home-scrolled" : "navbar navbar-home");
    } else {
      setClassName("navbar navbar-other");
    }

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [scroll, location.pathname]); // Re-run on scroll or route change

  
  return (
    <nav className={className}>
      <div className="nav_logo">Mern Hotel Booking</div>
      <ul className="nav_links">
        <li className="link">
          <a href="/">Home</a>{" "}
        </li>
        <li className="link">
          <a href="/details">Hotel</a>{" "}
        </li>
        <li className="link">
          <a href="#">Discover</a>{" "}
        </li>
        <li className="link">
          <a href="#">About Us</a>{" "}
        </li>
        <li className="link">
          <a href="#">Contact</a>{" "}
        </li>
      </ul>
      <div className="buttons">
      <Button variant="text" className="button" href="/signup"> SignUp </Button>
      <Button variant="outlined" className="button" href="/login">  LogIn </Button>
        
      </div>
    </nav>
  );
};
export { Navigation };
