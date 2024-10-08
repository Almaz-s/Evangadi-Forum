import React, { useRef } from "react";
import axios from "../../axios/AxiosConfig.jsx";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css"; // Import the CSS file

const SignUp = () => {
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

  return (
    <section className="SignUpContainer">
      <h2 className="header">Join the network</h2>
      <p className="firstAlreadyhaveAcc">
        Already have an account?{" "}
        <Link to="/login" className="signin-link">
          Sign in
        </Link>
      </p>
      <form className="SignupForm" action="" onSubmit={handleSubmit}>
        <div>
          <input ref={userNameDom} type="text" placeholder="Username" />
        </div>
        <div className="fullName">
          <input ref={fistNameDom} type="text" placeholder="First name" />
          <input ref={lastNameDom} type="text" placeholder="Last name" />
        </div>
        <div>
          <input ref={emailDom} type="email" placeholder="Email address" />
        </div>
        <div>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <div>
          <small>
            {" "}
            I agree to the <Link to="">privacy policy</Link> and{" "}
            <Link to="">terms of service</Link>
          </small>
        </div>
        <button className="btnJoin" type="submit">
          Agree and Join
        </button>

        <Link to="/login" className="signin-link">
          <p className="already-account">Already have an account? </p>
        </Link>
      </form>
    </section>
  );
};

export default SignUp;
