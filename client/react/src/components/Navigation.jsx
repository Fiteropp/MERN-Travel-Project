import "../styles/Navigation.css";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react"; // Import the animated icon

// Create MobileMenuContext
const MobileMenuContext = React.createContext();

const MenuProvider = ({ children }) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

const MenuToggleButton = () => {
  const { isMenuOpen, toggleMenu } = useContext(MobileMenuContext);

  return (
    <Hamburger
      toggled={isMenuOpen}
      toggle={toggleMenu}
      size={24} // Adjust size as needed
      color="#fff" // Customize color
    />
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll, setScroll] = useState(0);
  const [className, setClassName] = useState("navbar");
  const [user, setUser] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 930);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleScroll = () => setScroll(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (location.pathname === "/") {
      setClassName(scroll > 540 ? "navbar navbar-home-scrolled" : "navbar navbar-home");
    } else {
      setClassName("navbar navbar-other");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll, location.pathname]);

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
    <header className={className}>
      <div className="nav-container">
          <div className="nav_logo">Mern Travel Booking</div>
          
          <div className="desktop-menu-links">
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
                  <Link to={`/userprofile/${user._id}`}>Profile</Link>
                </li>
              )}
            </ul>
            
          </div>
          
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
                  <Button variant="text" className="button" href="/signup">
                    SignUp
                  </Button>
                  <Button variant="outlined" className="button" href="/login">
                    LogIn
                  </Button>
                </>
              )}
            </div>

          {isMobileView && <MenuToggleButton />} {/* Render the animated toggle only for mobile */}
        
      </div>
      
    </header>
    
  );
};

export { Navigation, MobileMenuContext, MenuProvider };
