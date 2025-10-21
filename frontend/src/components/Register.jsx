import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5004/api/users/register', // Make sure this port matches your backend
        formData
      );

      console.log('Registration successful:', response.data);
      alert('Success! You are now registered. Please log in.');

      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    // Added text-gray-900 to force dark text inside the card
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-xl text-gray-900">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Your Account
      </h2>
      <form onSubmit={onSubmit}>
        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={onChange}
            required
            // Added text-gray-900 to the input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;