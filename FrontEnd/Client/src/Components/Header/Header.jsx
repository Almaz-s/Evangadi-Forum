
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { AppState } from "../../App";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setUser(null); // Reset the user state
    navigate("/SignIn"); // Navigate to the login page
  };

  const isUserLoggedIn = !!token; // Boolean to check if the user is logged in


  return (

    <header className={classes.header}>
      {/* Logo Section */}
      <div className={classes.logo}>

        <Link to="/">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi Logo"
          />
        </Link>
      </div>


      {/* Navigation Links */}
      <div className={classes.navSection}>
        <ul className={classes.navLinks}>
          <li>
            <Link to="/" className={classes.navButton}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/HowItWorks" className={classes.navButton}>
              How it works
            </Link>
          </li>

          {isUserLoggedIn ? (
            <button onClick={handleLogout} className={classes.buttonPrimary}>
              Sign Out
            </button>
          ) : (
            <Link to="/SignIn" className={classes.loginBtn}>
              <button className={classes.buttonPrimary}>Sign In</button>
            </Link>
          )}
        </ul>
      </div>

    </header>
  );
}

export default Header;
