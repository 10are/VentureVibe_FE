import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Header.css'

const Header = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MyApp</Link>
      <div className="nav-items">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/register" className="nav-item">Register</Link>
        <Link to="/organization" className="nav-item">Organization</Link>
      </div>
    </nav>
  );
};

export default Header;