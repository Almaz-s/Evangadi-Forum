import React, { useRef } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      alert("user login successful.");
      navigate("/allQuestions");
      localStorage.setItem("token", data.token);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className="login-container">
      <h2 className="login-title">Login to your account</h2>
      <div className="Account">
        <span>Don't have an account?</span>{" "}
        <Link to="/signup" className="createAccount">
          Create a new account
        </Link>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            ref={emailDom}
            type="email"
            placeholder="Email"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            ref={passwordDom}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <span className="eye-icon"></span>
        </div>
        <div className="links-container">
          <Link to="/ForgotPassword" className="forgot-password">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </section>
  );
};

export default SignIn;
