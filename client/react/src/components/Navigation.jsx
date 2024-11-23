const Navigation = () => {
  return (
    <nav>
      <div className="nav_logo">Mern Hotel Booking</div>
      <ul className="nav_links">
        <li className="link">
          <a href="#">Home</a>{" "}
        </li>
        <li className="link">
          <a href="#">Hotel</a>{" "}
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
        <button>LogIn</button>
        <button>SignUp</button>
      </div>
    </nav>
  );
};
export { Navigation };
