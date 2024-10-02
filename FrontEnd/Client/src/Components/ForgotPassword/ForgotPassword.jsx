import React from "react";
import "./forgotPassword.css";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <div className="reset-password-page">
      {/* Left Side: Reset Password Form */}
      <div className="reset-password-container">
        <h2>Reset your password</h2>
        <p>
          Fill in your e-mail address below and we will send you an email with
          further instructions.
        </p>

        <form className="reset-password-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />

          <button type="submit" className="reset-btn">
            Reset your password
          </button>
        </form>

        <div className="account-links">
          <Link to="/SignIn" className="already-account">
            Already have an account?
          </Link>
          <Link to="/SignUp" className="dont-have-account">
            Don't have an account?
          </Link>
        </div>
      </div>

      {/* Right Side: Information Section */}
      <div className="info-section">
        <h2>Evangadi Networks Q & A</h2>
        <p>
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <Link to="/HowItWorks" className="how-it-works-btn">
          How it Works
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;