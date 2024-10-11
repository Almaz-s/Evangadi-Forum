import React, { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      const response = await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      if (response.status === 201 || response.data) {
        alert("Registered successfully. Please login.");
        navigate("/SignIn"); // Make sure this is reached after successful registration
      }
    } catch (error) {
      alert("Something went wrong.");
      console.log(error.response);
    }
  }

  return (
    <section className="SignUpContainer">
      <div className="form-section">
        <h2 className="header">Join the network</h2>
        <p className="firstAlreadyhaveAcc">
          Already have an account?{" "}
          <Link to="/SignIn" className="signin-link">
            Sign in
          </Link>
        </p>
        <form className="SignupForm" action="" onSubmit={handleSubmit}>
          <div>
            <input ref={userNameDom} type="text" placeholder="Username" />
          </div>
          <div className="fullName">
            <input ref={firstNameDom} type="text" placeholder="First name" />
            <input ref={lastNameDom} type="text" placeholder="Last name" />
          </div>
          <div>
            <input ref={emailDom} type="email" placeholder="Email address" />
          </div>
          <div className="password-container">
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="agree-to-join">
            <small>
              I agree to the <Link to="">privacy policy</Link> and{" "}
              <Link to="">terms of service</Link>
            </small>
          </div>
          <button className="btnJoin" type="submit">
            Agree and Join
          </button>
        </form>
        <Link to="/SignIn" className="signin-link">
          <p className="already-account">Already have an account? </p>
        </Link>
      </div>

      <div className="info-section">
        <h3 className="abt">About</h3>
        <br />
        <h1 className="ev-color">Evangadi Networks Q & A</h1>
        <br />
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
    </section>
  );
};

export default SignUp;
