import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import "../styles/bookingForm.css";

import { Link } from "react-router-dom";

<div className="link-container">
  <Link to="/profile" className="profile-link">
    Go to Profile
  </Link>
</div>
 
const BookingForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(null);

  // Calculate the maximum check-in date
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, data);
      setConfirmation(response.data.message);
      //navigate("/booking-history");
      navigate("/");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  const checkInDate = watch("checkInDate");

  // Func to handle Name
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    // keep only latin letters and spaces
    const sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    // Make the first letter uppercase
    const capitalizedValue = sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1);
    setValue("fullName", capitalizedValue); // Put value into the form
  };

  return (
    <div className="background-image">
    <div className="booking-container">
      <h2 className="form-title">Booking Form</h2>
      <p className="form-subtitle">Personal booking</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="input-group">
  <label className="input-label">Full Name</label>
  <div className="input-container">
    <input
      type="text"
      className="input-field with-counter"
      placeholder="Ann Pine"
      maxLength="50"
      {...register("fullName", {
        required: "Field is required",
        minLength: { value: 2, message: "At least two symbols" },
        pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
      })}
      onChange={handleNameChange}
    />
    <span className="char-counter">
      {watch("fullName")?.length || 0}/50
    </span>
  </div>
  {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
</div>


        {/* Check-in Date */}
        <div className="input-group">
          <label htmlFor="checkInDate" className="input-label">Check-in Date</label>
          <input
            type="date"
            className="input-field"
            placeholder="dd/mm/yyyy"
            {...register("checkInDate", {
              required: "Check-in date is required",
            })}
          />
          {errors.checkInDate && <p className="error-message">{errors.checkInDate.message}</p>}
        </div>

        {/* Check-out Date */}
        <div className="input-group">
          <label htmlFor="checkOutDate" className="input-label">Check-out Date</label>
          
          <input
          
            type="date"
            className="input-field"
            placeholder="dd/mm/yyyy"
            
            {...register("checkOutDate", {
              required: "Check-out date is required",
              validate: value =>
                value > checkInDate || "Check-out date must be after check-in date",
            })}
          />
          {errors.checkOutDate && <p className="error-message">{errors.checkOutDate.message}</p>}
        </div>

        {/* Guests */}
        <div className="input-group">
          <label className="input-label">Guests</label>
          <input
            type="number"
            className="input-field"
            placeholder="0"
            min="1"
            max="30"
            step="1"
            {...register("guests", {
              required: "Guest's number is required",
              min: { value: 1, message: "At least one guest is required" },
              max: { value: 30, message: "The maximum number of guests is 30" },
            })}
          />
          {errors.guests && <p className="error-message">{errors.guests.message}</p>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {confirmation && <p className="confirmation-message">{confirmation}</p>}
    </div>
    </div>
  );
};

export default BookingForm;
