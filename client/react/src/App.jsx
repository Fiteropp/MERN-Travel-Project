//import * from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingForm from './components/bookingform'
import './App.css';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/booking-form" element={<BookingForm />} />
      <Route path="/booking-history" element={<div>Booking history</div>} />
    </Routes>
  </Router>
  )
}

export default App

