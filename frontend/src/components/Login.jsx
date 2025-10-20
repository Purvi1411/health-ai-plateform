import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // We'll use this to redirect

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Get the redirect function

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5004/api/users/login', // Make sure this port is correct!
        formData
      );

      // SUCCESS! We got a token.
      console.log('Login successful:', response.data);

      // Store the user's data (and token) in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('Login successful! Welcome back.');

      // Redirect to the homepage (which will be our dashboard)
      navigate('/');

    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-container"> {/* We can reuse the same style */}
      <h2>Login to Your Account</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;