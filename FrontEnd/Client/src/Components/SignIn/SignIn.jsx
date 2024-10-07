import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosBase from "../../axiosConfig"; // Import axiosBase from the config
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      const response = await axiosBase.post(`/users/register`, {
        // Use axiosBase for the request
        email,
        password,
      });

      alert("LogIn successful.");
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      // Redirect to home or another page
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="login-page">
      {/* Left Side: Login Form */}
      <div className="login-form-container">
        <h2>Login to your account</h2>
        <p>
          Don’t have an account?
          <Link to="/SignUp" className="create-account-link">
            Create a new account
          </Link>
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            placeholder="Email"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type="password"
              id="password"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              placeholder="Password"
              required
            />
            <span className="show-password">
              <i className="fas fa-eye"></i> {/* FontAwesome icon for eye */}
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
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
}

export default SignIn;
