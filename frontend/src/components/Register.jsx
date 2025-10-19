import React from 'react';

function Register() {
  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;