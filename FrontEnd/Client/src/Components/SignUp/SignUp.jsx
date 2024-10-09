import React, { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"; // Import the CSS file
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const fistNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = fistNameDom.current.value;
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
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("registered successfully. Please login");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
      console.log(error.response);
    }
  }
  // Toggles the password visibility between plain text and hidden
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="SignUpContainer">
      <div className="register-form-wrapper">
        {/* Left-side form section */}
        <div className="register-form-container">
          <h2 className="header">Join the network</h2>
          <p className="firstAlreadyhaveAcc">
            Already have an account?{" "}
            <Link
              to="/SignIn"
              className="login-link"
              style={{ color: "#ff8401" }}
            >
              Sign in
            </Link>
          </p>
          <form className="SignupForm" action="" onSubmit={handleSubmit}>
            <div>
              <input ref={emailDom} type="email" placeholder="Email" />
            </div>
            <div className="fullName">
              <input ref={fistNameDom} type="text" placeholder="First Name" />
              <input ref={lastNameDom} type="text" placeholder="Last Name" />
            </div>
            <div>
              <input ref={userNameDom} type="text" placeholder="User Name" />
            </div>
            <div>
              <input ref={passwordDom} type="password" placeholder="Password" />
              <span
                className="visible-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
                {/* Toggle visibility icon */}
              </span>
            </div>
            <div>
              <small>
                I agree to the{" "}
                <Link to="" style={{ color: "#ff8401" }}>
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link to="" style={{ color: "#ff8401" }}>
                  terms of service
                </Link>
              </small>
            </div>
            <button className="btnJoin" type="submit">
              Agree and Join
            </button>
          </form>
        </div>
      </div>

      {/* Right-side info section */}
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

export default SignUp;
