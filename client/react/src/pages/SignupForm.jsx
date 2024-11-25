import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../services/authService.js';
import '../styles/Form.css';
import eyeOpen from '../assets/eye-open.png';
import eyeClosed from '../assets/eye-closed.png';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Something went wrong, please try again.');
      return;
    }

    try {
      const response = await axiosInstance.post('api/auth/signup', formData);
      const { token } = response.data;
      //console.log(response)
      setAuthToken(token);
      //navigate('/dashboard');
    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p className="desc">Let’s get you all set up so you can access your personal account.</p>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name *"
        value={formData.fullName}
        onChange={handleChange}
      />
      <div className="row">
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="password-field">
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password *"
          value={formData.password}
          onChange={handleChange}
        />
        <img
          src={formData.showPassword ? eyeOpen : eyeClosed}
          alt="Toggle password visibility"
          className="eye-icon"
          onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
        />
      </div>
      <div className="password-field">
        <input
          type={formData.showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm Password *"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <img
          src={formData.showConfirmPassword ? eyeOpen : eyeClosed}
          alt="Toggle confirm password visibility"
          className="eye-icon"
          onClick={() =>
            setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword })
          }
        />
      </div>
      <div className="terms">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />
        <label>
          I agree to all the <span>Terms</span> and <span>Privacy Policies</span>
        </label>
      </div>
      <button type="submit">Create account</button>
      <p className="login-link">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          style={{ color: '#276968', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Login
        </span>
      </p>
      <div className="social-login">
        <span>Or Sign up with</span>
        <div className="social-buttons">
          <button className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
