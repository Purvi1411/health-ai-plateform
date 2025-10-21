import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our auth hook

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth(); // Get the login function from our context
  const navigate = useNavigate();

  // This function updates the state as the user types
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function runs when the user clicks "Login"
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5004/api/users/login', // Make sure this port matches your backend
        formData
      );

      // Call the login function from our context
      login(response.data);

      alert('Login successful! Welcome back.');

      // Redirect to the homepage (dashboard)
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    // Added text-gray-900 to force dark text inside the card
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-xl text-gray-900">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login to Your Account
      </h2>
      <form onSubmit={onSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            // Added text-gray-900 to the input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            // Added text-gray-900 to the input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;