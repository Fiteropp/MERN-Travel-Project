import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="section_container footer_container">
        <div className="footer_section">
          <h3>Mern Hotel Booking</h3>
          <p>
            Mern is a premier hotel booking website that offers a seamless and
            convenient way to find and book accomodation worldwide.
          </p>
          <p>
            With a user-friendly interface and a vast selection of hotels, Mern
            aims to provide a stress-free experience for travellers seeking the
            perfect stay.
          </p>
        </div>
        <div className="footer_col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Our Team</p>
          <p>Blog</p>
          <p>Book</p>
          <p>Contact Us</p>
        </div>
        <div className="footer_col">
          <h4>Legal</h4>
          <p>FAQS</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        
      </div>
      <div className="footer_bar">
        Copyright @ 2024 Mern Hotel Booking. All rights reserved.
      </div>
    </footer>
  );
};

export { Footer };
