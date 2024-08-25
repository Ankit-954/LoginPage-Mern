import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); 

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      const { success, message } = response.data;

      if (response.status === 200) {
        console.log('Login successful', message);
        navigate('/home');  
      } else {
        console.error('Login failed', message);
        alert(message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed', error);
    }

    setLoginData({
      username: '',
      password: '',
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={loginData.username}
          onChange={handleLoginChange}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
