import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./styles.css";

function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/booking", data);
      setConfirmation(response.data.message);
      setTimeout(() => navigate("/booking-history"), 2000); // Перенаправление через 2 секунды
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name:
          <input
            {...register("firstName", {
              required: "Field is required",
              minLength: {
                value: 2,
                message: "At least two symbols.",
              },
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}
        </div>

        <label>
          Last Name:
          <input
            {...register("lastName", {
              required: "Field is required",
              minLength: {
                value: 2,
                message: "At least two symbols.",
              },
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.lastName && <p>{errors?.lastName?.message || "Error!"}</p>}
        </div>

        <label>
          Date:
          <input
            type="date"
            {...register("travelDate", {
              required: "Date of staying",
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors.travelDate && <p>{errors.travelDate.message}</p>}
        </div>

        <label>
          Guests:
          <input
            type="number"
            {...register("travelers", {
              required: "Guest's number required",
              min: {
                value: 1,
                message: "At least one guest required",
              },
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors.travelers && <p>{errors.travelers.message}</p>}
        </div>

        <input type="submit" />
      </form>

      {confirmation && <p>{confirmation}</p>}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route
          path="/booking-history"
          element={<div>Booking history</div>}
        />
      </Routes>
    </Router>
  );
}
