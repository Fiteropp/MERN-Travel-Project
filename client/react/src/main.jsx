import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import  SignupForm  from "./pages/SignupForm.jsx";
import BookingForm from "./components/bookingForm.jsx";
import  LoginForm  from "./pages/LoginForm.jsx";
import { HotelDetails } from "./pages/HotelDetails.jsx";
import { HotelSearch } from "./pages/HotelSearch.jsx";
import ModDash from "./pages/ModDash.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/discover" element={<HotelSearch />}/>
      <Route path="/moderator" element={<ModDash />} />
      <Route path="/booking-form" element={<BookingForm />} />
      <Route path="/booking-history" element={<div>Booking history</div>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


