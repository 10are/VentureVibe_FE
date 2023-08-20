import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/RegisterForm.css';
import config from '../config';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const switchToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.BASE_URL}dj-rest-auth/registration/`, {
      email,
      password1,
      password2
    })
    .then(response => {
        console.log(response.data);
        navigate('/');
    })
    .catch(error => {
        console.error('There was an error!', error);
        setError('Registration failed. Please check your input and try again.');
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
        <button type="button" className="switch-form-btn" onClick={switchToLogin}>
           Login
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
