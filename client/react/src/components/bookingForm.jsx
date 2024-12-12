import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/bookingForm.css";

/**
 * The BookingForm component renders a form for booking a room.
 * It fetches the room details from the backend API and displays them in the form.
 * The form takes the check-in date, check-out date, and number of guests as input.
 * When the form is submitted, it sends a booking request to the backend API.
 * If the request is successful, it navigates to the home page with a success message
 * and booking ID. If there is an error, it sets a submission error message.
 * 
 * @param {string} hotelId - The ID of the hotel that the room belongs to.
 * @param {string} roomId - The ID of the room being booked.
 * @returns {JSX.Element} The BookingForm component.
 */
const BookingForm = () => {
 // const { hotelId, roomId } = useParams(); // Assuming room ID is also in the route
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      hotel: hotelId,
      room: roomId,
      guests: 1 // Default to 1 guest
    }
  });
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  // Fetch room details when component mounts
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getroom/${roomId}`
        );
        setRoomDetails(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setSubmitError("Could not load room details");
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  const checkInDate = watch("checkInDate");

/**
 * Handles the form submission for booking a room.
 * 
 * This function takes form data, constructs a booking request, 
 * and sends it to the backend API. It manages the submission state 
 * and handles any errors that occur during the process.
 * 
 * @param {Object} data - The form data containing booking details.
 * @param {Date} data.checkInDate - The check-in date.
 * @param {Date} data.checkOutDate - The check-out date.
 * @param {number} data.maxPeople - The maximum number of guests.
 * 
 * On success, navigates to the home page with a success message 
 * and booking ID. On error, sets a submission error message.
 */
  const onSubmit = async (data) => {
    setSubmitError(null);
    
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      axios.defaults.withCredentials = true;

      const bookingData = {
        hotel: hotelId,
        room: roomId,
        checkIn: data.checkInDate,
        checkOut: data.checkOutDate,
        guests: data.maxPeople,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`, 
        bookingData
      );

      navigate("/", {
        state: { 
          message: "Booking created successfully!",
          bookingId: response.data._id 
        }
      });

    } catch (error) {
      console.error("Error booking:", error);
      
      setSubmitError(
        error.response?.data?.message || 
        "Failed to create booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="background-image">
      <div className="booking-container">
        <h2 className="form-title">Booking Form</h2>
        
        {submitError && (
          <div className="error-banner">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Details (if fetched) */}
          {roomDetails && (
            <div className="room-info">
              <p>Room: {roomDetails.roomNumber}</p>
              <p>Room Type: {roomDetails.type}</p>
            </div>
          )}
          <div className="input-group">
            <label htmlFor="checkInDate" className="input-label">Check-in Date</label>
            <input
              type="date"
              className="input-field"
              {...register("checkInDate", {
                required: "Check-in date is required",
              })}
            />
            {errors.checkInDate && <p className="error-message">{errors.checkInDate.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="checkOutDate" className="input-label">Check-out Date</label>
            <input
              type="date"
              className="input-field"
              {...register("checkOutDate", {
                required: "Check-out date is required",
                validate: value =>
                  value > checkInDate || "Check-out date must be after check-in date",
              })}
            />
            {errors.checkOutDate && <p className="error-message">{errors.checkOutDate.message}</p>}
          </div>
          <div className="input-group">
            <label className="input-label">Number of Guests</label>
            <input
              type="number"
              className="input-field"
              min="1"
              max={roomDetails ? roomDetails.maxPeople : 10}
              {...register("guests", {
                required: "Number of guests is required",
                min: { 
                  value: 1, 
                  message: "At least 1 guest is required" 
                },
                max: { 
                  value: roomDetails ? roomDetails.maxPeople : 10, 
                  message: `Maximum ${roomDetails?.maxPeople || 10} guests for this room` 
                },
                valueAsNumber: true
              })}
            />
            {errors.guests && <p className="error-message">{errors.guests.message}</p>}
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || !roomDetails}
          >
            {isSubmitting ? "Creating Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;