import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../services/authService.js';
import '../styles/Form.css';
import eyeOpen from '../assets/Icons/eye-open.png';
import eyeClosed from '../assets/Icons/eye-closed.png';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('api/auth/signin', { email, password });
      const { token } = response.data;
      setAuthToken(token);
      navigate("/");
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className="desc">Login to access your MERN TRAVEL account.</p>
      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-field">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={passwordVisible ? eyeOpen : eyeClosed}
          alt="Toggle password visibility"
          className="eye-icon"
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      </div>
      <div className="row">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <span>Forgot password?</span>
      </div>
      <Link to="/userprofile/:id">
      <button type="submit">Login</button>
      </Link>
      <p className="login-link">
        Don’t have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          style={{ color: '#276968', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}

export default LoginForm;





