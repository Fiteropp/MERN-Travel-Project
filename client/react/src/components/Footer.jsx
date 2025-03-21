import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_section">
          <h3>Arieval Travel</h3>
          <p>
            Making the world a better place through seamless hotel booking and elegant experiences.
          </p>
          <div className="social_icons">
            <a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/vantaanvaria/"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://github.com/Fiteropp/MERN-Travel-Project"><i className="fab fa-github"></i></a>
            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer_col">
          <h4>Company</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/discover">Discover</Link></p>
          <p><Link to="/our-team">Our Team</Link></p>
          <p><Link to="/contact">Contact Us</Link></p>
        </div>
        <div className="footer_col">
          <h4>Legal</h4>
          <p><Link to="#">FAQS</Link></p>
          <p><Link to="#">Terms & Conditions</Link></p>
          <p><Link to="#">Privacy Policy</Link></p>
        </div>
      </div>
      <div className="footer_bar">
        Copyright © 2025 Arieval Travel Agency. All rights reserved.
      </div>
    </footer>
  );
};

export { Footer };