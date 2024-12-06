import "../styles/Navigation.css";
import Button from '@mui/material/Button';

const Navigation = () => {
  return (
    <nav>
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
        <Button variant="outlined" className="button" href="/login">  LogIn </Button>
        <Button variant="outlined" className="button" href="/signup"> SignUp </Button>
      </div>
    </nav>
  );
};
export { Navigation };
