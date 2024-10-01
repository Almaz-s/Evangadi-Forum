import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi Logo"
          />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/HowItWorks">How it Works</Link>
        <Link to="/login" className="login-btn">
          SIGN IN
        </Link>
      </nav>
    </header>
  );
};

export default Header;
