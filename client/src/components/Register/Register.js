import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="login-container">
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Register;
