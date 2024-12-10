
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../services/authService.js';
import '../styles/Form.css';
import eyeOpen from '../assets/Icons/eye-open.png';
import eyeClosed from '../assets/Icons/eye-closed.png';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    termsAccepted: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Something went wrong, please try again.");
      return;
    }

    try {
      const response = await axiosInstance.post("api/auth/signup", formData);
      const { token } = response.data;
      console.log(response);
      setAuthToken(token);
      navigate("/");
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p className="desc">
        Let’s get you all set up so you can access your personal account.
      </p>
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
          type={formData.showPassword ? "text" : "password"}
          name="password"
          placeholder="Password *"
          value={formData.password}
          onChange={handleChange}
        />
        <img
          src={formData.showPassword ? eyeOpen : eyeClosed}
          alt="Toggle password visibility"
          className="eye-icon"
          onClick={() =>
            setFormData({ ...formData, showPassword: !formData.showPassword })
          }
        />
      </div>
      <div className="password-field">
        <input
          type={formData.showConfirmPassword ? "text" : "password"}
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
            setFormData({
              ...formData,
              showConfirmPassword: !formData.showConfirmPassword,
            })
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
          I agree to all the <span>Terms</span> and{" "}
          <span>Privacy Policies</span>
        </label>
      </div>
      <button type="submit">Create account</button>
      <p className="login-link">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#276968", cursor: "pointer", fontWeight: "bold" }}
        >
          Login
        </span>
      </p>
    </form>
  );
}

export default SignupForm;
