import "../styles/Navigation.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getAuthToken } from "../services/authService";
import { jwtDecode } from "jwt-decode";
const Navigation = () => {
  
  const location = useLocation(); // Get the current route
  const [scroll, setScroll] = useState(0);
  const [className, setClassName] = useState("navbar");
  const [user, setUser] = useState(null);

// Check for token and decode user info
useEffect(() => {
  const token = getAuthToken(); // Get token from cookies
  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode JWT to get user info
      setUser(decoded); // Set user info (e.g., name, ID)
      console.log(user);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser(null); // Clear user state if token is invalid
    }
  } else {
    setUser(null); // Clear user state if no token
  }
}, []);

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


  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // Clear cookie
    setUser(null); // Clear user state
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className={className}>
      <div className="nav_logo">Mern Hotel Booking</div>
      <ul className="nav_links">
        <li className="link">
          <Link to="/">Home</Link>{" "}
        </li>
        <li className="link">
          <Link to="/discover">Discover</Link>{" "}
        </li>
        <li className="link">
          <Link to="#">About Us</Link>{" "}
        </li>
        <li className="link">
          <Link to="#">Contact</Link>{" "}
        </li>
        {user && (
          <li className="link">
            <Link to={`/userprofile/${user._id}`}>Profile</Link>{" "} 
          </li>
        )}
      </ul>
      <div className="buttons">
        {user ? (
          <>
            <span className="username">Hello, {user.name}</span> 
            <Button variant="outlined" className="button" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="text" className="button" href="/signup">SignUp</Button>
            <Button variant="outlined" className="button" href="/login">LogIn</Button>
          </>
        )}
      </div>
    </nav>
  );
};
export { Navigation };
