import "../styles/Navigation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const checkLoginStatus = () => {
    const jwt = getCookie("jwt");
    console.log("JWT Cookie:", jwt); // Debugging
    setIsLoggedIn(!!jwt);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);


  return (
    <nav>
      <div className="nav_logo">Mern Hotel Booking</div>
      <ul className="nav_links">
        <li className="link">
          <a href="/">Home</a>{" "}
        </li>
        <li className="link">
          <a href="/discover">Discover</a>{" "}
        </li>
        <li className="link">
          <a href="#">About Us</a>{" "}
        </li>
        <li className="link">
          <a href="#">Contact</a>{" "}
        </li>
      </ul>
      <div className="buttons">
        {isLoggedIn ? (
          <button><a href="/profile">Profile</a></button>
        ) : (
          <>
            <button>
              <a href="/login">LogIn</a>
            </button>
            <button>
              <a href="/signup">SignUp</a>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export { Navigation };
