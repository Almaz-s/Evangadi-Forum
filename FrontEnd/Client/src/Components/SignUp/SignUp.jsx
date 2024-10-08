import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.yourbackend.com/signup",
        formData
      );
      console.log("Registration successful:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h3>Join the network</h3>
        <p>
          Already have an account? <a href="/SignIn">Sign In</a>
        </p>
        {submitted ? (
          <div className="success-message">Registration Successful!</div>
        ) : (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                I agree to the <a href="#">privacy policy</a> and{" "}
                <a href="#">terms of service</a>.
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Agree and Join
            </button>
          </form>
        )}

        <p>
          Already have an account? <Link to="/SignIn">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
