import React from "react";
import { Link } from "react-router-dom"; 
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo section, linking back to the homepage */}
      <div className="logo">
        <Link to="/">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi Logo"
          />
        </Link>
      </div>

      {/* Navigation section with links to different pages */}
      <nav className="nav-links">
        <Link to="/">Home</Link> {/* Link to Home page */}
        <Link to="/HowItWorks">How it Works</Link>{" "}
        {/* Link to How it Works page */}
        <Link to="/SignIn" className="login-btn">
          {" "}
          {/* Link to Sign In page */}
          SIGN IN
        </Link>
      </nav>
    </header>
  );
};

export default Header;
