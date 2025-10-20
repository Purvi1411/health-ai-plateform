import React, { useState } from 'react';
import axios from 'axios'; // <-- Import axios

function Register() {
  // 1. Create 'state' to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // 2. A function to update state when user types
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. A function to handle the form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    
    try {
      // We will send our formData to the backend API
      const response = await axios.post(
        'http://localhost:5004/api/users/register', // <-- Make sure this port matches your backend
        formData
      );

      console.log('Registration successful:', response.data);
      alert('Success! You are now registered.');
      
      // Clear the form
      setFormData({ username: '', email: '', password: '' });
      
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form onSubmit={onSubmit}> {/* <-- Call onSubmit when form is submitted */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username" // <-- Add name attribute
            value={formData.username} // <-- Link to state
            onChange={onChange} // <-- Call onChange when typing
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email" // <-- Add name attribute
            value={formData.email} // <-- Link to state
            onChange={onChange} // <-- Call onChange when typing
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password" // <-- Add name attribute
            value={formData.password} // <-- Link to state
            onChange={onChange} // <-- Call onChange when typing
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;