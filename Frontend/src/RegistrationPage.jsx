import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', registrationData);
      const { success, message } = response.data;

      if (success) {
        console.log('Registration successful', message);
      } else {
        console.error('Registration failed', message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }

    setRegistrationData({
      username: '',
      password: '',
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1>Registration Page</h1>
        <form onSubmit={handleRegistrationSubmit}>
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={registrationData.username}
            onChange={handleRegistrationChange}
            required
          />
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
