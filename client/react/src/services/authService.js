//This file will contain functions to interact with the backend API for authentication.
import axios from 'axios';

const API_URL = 'http://localhost:8080/'; // Replace with your API URL BACKEND

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Function to set JWT token in the cookies
const setAuthToken = (token) => {
  if (token) {
    // Store token in a cookie
    document.cookie = `token=${token}; path=/; max-age=3600`; // 1 hour expiration
  } else {
    // Remove token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }
};

// Function to get the token from the cookies
const getAuthToken = () => {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
};

// Attach JWT token to request headers if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance, setAuthToken };

