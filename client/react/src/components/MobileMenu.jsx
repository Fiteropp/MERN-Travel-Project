import React, { useContext, useState, useEffect } from 'react';
import { stack as Menu } from 'react-burger-menu'
import { MobileMenuContext } from './Navigation'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import "../styles/MobileMenu.css";
import Button from "@mui/material/Button";
import { useUser } from "../contexts/UserContext.jsx"; // Import UserContext

const MobileMenu = () => {
    const { isMenuOpen, toggleMenu, stateChangeHandler } = useContext(MobileMenuContext);
    const { user, setUser, loading } = useUser(); // Use global user context


      const handleLogout = async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
    
          setUser(null);
          navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

    return (
        <Menu
        isOpen={isMenuOpen} // Controlled by context
        onStateChange={stateChangeHandler}
        right // Updates context when menu state changes
        className='mobile-menu'
        customCrossIcon={ false }
      >
        <ul className="nav_links">
                  <li className="link">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="link">
                    <Link to="/discover">Discover</Link>
                  </li>
                  <li className="link">
                    <Link to="#">About Us</Link>
                  </li>
                  <li className="link">
                    <Link to="#">Contact</Link>
                  </li>
                  {user && (
                  <li className="link">
                  <Link to={`/userprofile`}>Profile</Link>
                  </li>)}
                </ul>

                <div className="mobile-menu-buttons">
              {user ? (
                <>
                  <span className="mb-username">{user.fullName}</span>
                  <Button variant="outlined" className="button" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="text" className="button" href="/signup">
                    SignUp
                  </Button>
                  <Button variant="outlined" className="button" href="/login">
                    LogIn
                  </Button>
                </>
              )}
            </div>
      </Menu>
    );
  };
  
  export default MobileMenu;