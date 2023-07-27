import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/LoginForm.css';
import config from '../config';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.BASE_URL}dj-rest-auth/login/`, {
      email,
      password
    })
    .then(response => {
        console.log(response.data);
        localStorage.setItem('authToken', response.data.key); 

       
        axios.get(`${config.BASE_URL}dj-rest-auth/user/`, {
          headers: {
            Authorization: `Token ${response.data.key}`
          }
        })
        .then(userResponse => {
          console.log(userResponse.data);
          localStorage.setItem('username', userResponse.data.username); 
          navigate('/');
        })
        .catch(error => {
          console.error('Error fetching user data', error);
          navigate('/');
        });
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;