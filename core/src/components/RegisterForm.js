import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/RegisterForm.css';


function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
      email,
      password1,
      password2
    })
    .then(response => {
        console.log(response.data);
        navigate('/')
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Register</h2>
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
      </form>
    </div>
  );
}



export default RegisterForm;
