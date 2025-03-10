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
import UserDash from "./pages/UserDash.jsx";
import {OurTeam} from "./pages/OurTeam.jsx";
import Contacts from "./pages/Contact.jsx"
import AdminDash from "./pages/AdminDash.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/discover" element={<HotelSearch />} />
      <Route path="/userprofile" element={<UserDash />} />
      <Route path="/moderator" element={<ModDash />} />
      <Route path="/admindash" element={<AdminDash />} />
      <Route path="/booking-form/:id" element={<BookingForm />} />
      <Route path="/our-team" element={<OurTeam />} />
      <Route path="/contact" element={<Contacts />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
