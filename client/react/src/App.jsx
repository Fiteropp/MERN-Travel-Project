import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SignupForm from './pages/SignupForm.jsx';
import LoginForm from './pages/LoginForm.jsx';
import './styles/Form.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="background-layout">
          <div className="inner-layout">
            <Routes>
              {/* Route for login form */}
              <Route path="/login" element={<LoginForm />} />
              {/* Route for signup form */}
              <Route path="/signup" element={<SignupForm />} />
              {/* Default route redirects to login */}
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;







