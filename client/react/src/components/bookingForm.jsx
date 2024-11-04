import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  useNavigate
} from "react-router-dom";
import "../styles/bookingForm.css";

function BookingForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [confirmation, setConfirmation] = useState(null); //"setConfirmation" is ised for "Display confirmation upon successful booking."
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
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

  //"onSubmit = asyns (data)" function is for "Send booking data to the backend via the booking API."

  //Redirection using "setTimeout(() => navigate("/booking-history"), 2000);" moves the user to the /booking-history page 2 seconds after booking confirmation.

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setValue("checkInDate", date);
    if (date > checkOutDate) {
      setCheckOutDate(date);
      setValue("checkOutDate", date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setValue("checkOutDate", date);
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
              onChange: (e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                const capitalizedValue = value.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                setValue("firstName", capitalizedValue);
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
              onChange: (e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                const capitalizedValue = value.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                setValue("lastName", capitalizedValue);
              },
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.lastName && <p>{errors?.lastName?.message || "Error!"}</p>}
        </div>

        <label>
          Check-in Date:
          <DatePicker
            selected={checkInDate}
            onChange={handleCheckInDateChange}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors.checkInDate && <p>{errors.checkInDate.message}</p>}
        </div>

        <label>
          Check-out Date:
          <DatePicker
            selected={checkOutDate}
            onChange={handleCheckOutDateChange}
            minDate={checkInDate} // Установка минимальной даты для выбора
          />
        </label>
        <div style={{ height: 40 }}>
          {errors.checkOutDate && <p>{errors.checkOutDate.message}</p>}
        </div>

        <label>
          Guests:
          <input
            type="number"
            min="0" // The minimum value is 0 to prevent the input of negative numbers. Минимальное значение 0, чтобы предотвратить ввод отрицательных чисел
            max="30" // The maximum value is 30. Максимальное значение 30.
            step="1" // The step is 1 to allow only integers. Шаг равен 1, чтобы разрешить только целые числа.
            {...register("travelers", {
              required: "Guest's number is required",
              min: {
                value: 1,
                message: "At least one guest is required",
              },
              max: {
                value: 30,
                message: "The maximum number of guests is 30",
              },
            })}
          />
        </label>
        <div className="error-message">
          {errors.travelers && <p>{errors.travelers.message}</p>}
        </div>

        <input type="submit" />
        {confirmation && <p>{confirmation}</p>}
      </form>
    </div>
    //"setConfirmation" is ised for "Display confirmation upon successful booking."
    //"{confirmation && <p>{confirmation}</p>}" is the element for displaying the confirmation message.
  );
}

export default BookingForm