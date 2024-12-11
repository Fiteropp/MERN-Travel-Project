import "../styles/Navigation.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuthToken } from "../services/authService";
import { jwtDecode } from "jwt-decode";
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [scroll, setScroll] = useState(0);
  const [className, setClassName] = useState("navbar");
  const [user, setUser] = useState({});

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`,{
                  method: 'GET',
                  credentials: 'include'
              }     
              );
              const data = await response.json();
              setUser(data);
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      }
  },[]);

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
            <span className="username">{user.fullName}</span> 
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
