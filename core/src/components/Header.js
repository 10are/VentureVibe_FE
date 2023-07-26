import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/Header.css';

const Header = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/dj-rest-auth/logout/');
      localStorage.removeItem('authToken'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Home</Link>
      <div className="nav-items">
        {isAuthenticated() && (
          <React.Fragment>
            <span className="nav-item">Hello, {localStorage.getItem('username')}</span>
            <Link to="/OrganizationPage" className="nav-item">Post</Link>
            <button className="nav-item logout-btn" onClick={handleLogout}>Logout</button>
          </React.Fragment>
        )}
        {!isAuthenticated() && (
          <React.Fragment>
            {location.pathname === "/login" ? (
              <React.Fragment>
                <Link to="/register" className="nav-item">Register</Link>
                <Link to="/login" className="nav-item">Login</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/login" className="nav-item">Login</Link>
                <Link to="/register" className="nav-item">Register</Link>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Header;
