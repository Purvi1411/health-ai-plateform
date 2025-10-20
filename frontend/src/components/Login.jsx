import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORT USEAUTH

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth(); // <-- 2. GET THE LOGIN FUNCTION
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5004/api/users/login', // <-- Use port 5004 (or your current port)
        formData
      );

      // 3. CALL THE CONTEXT LOGIN FUNCTION
      // This saves the user to state AND localStorage
      login(response.data);

      alert('Login successful! Welcome back.');

      // 4. Redirect to the homepage
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-container">
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