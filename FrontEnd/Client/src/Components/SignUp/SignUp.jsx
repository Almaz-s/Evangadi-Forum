// import React, { useState } from "react";
// import axios from "../../axios/Axios";


// import "./SignUp.css";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username) newErrors.username = "Username is required";
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/users/register",
//         formData
//       );
//       console.log("Registration successful:", response.data);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <div className="signup-background">
//       <div className="signup-container">
//         <h3>Join the network</h3>
//         <p>
//           Already have an account? <a href="/login">Sign in</a>
//         </p>
//         {submitted ? (
//           <div className="success-message">Registration Successful!</div>
//         ) : (
//           <form onSubmit={handleSubmit} className="signup-form">
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.username && (
//                 <span className="error">{errors.username}</span>
//               )}
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <span className="error">{errors.firstName}</span>
//                 )}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <span className="error">{errors.lastName}</span>
//                 )}
//               </div>
//             </div>

//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && <span className="error">{errors.email}</span>}
//             </div>

//             <div className="form-group">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <span
//                 className="password-toggle"
//                 onClick={() => setPasswordVisible(!passwordVisible)}
//               >
//                 {passwordVisible ? "Hide" : "Show"}
//               </span>
//               {errors.password && (
//                 <span className="error">{errors.password}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <label>
//                 I agree to the <a href="#">privacy policy</a> and{" "}
//                 <a href="#">terms of service</a>.
//               </label>
//             </div>

//             <button type="submit" className="submit-btn">
//               Agree and Join
//             </button>
//           </form>
//         )}

//         <p>
//           Already have an account? <a href="/login">Sign in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/Axios"


function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // To capture errors

  // Refs to store input fields
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      setError("Please provide all required information");
      return;
    }

    try {
      // Clear any previous errors
      setError("");

      // Make the registration request
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });

      alert("Registration successful");
      navigate("/signIn"); // Redirect after successful registration
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Error:", error); // For debugging purposes
    }
  }

  return (
    <section className="signup-section">
      <div className="form-container">
        <h2>Join the network</h2>
        <p>
          Already have an account?{" "}
          <a href="/signIn" className="signin-link">
            Sign in
          </a>
        </p>

        {/* Display error if any */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              ref={usernameDom}
              type="text"
              placeholder="Username"
              className="form-input"
            />
          </div>
          <div className="input-field">
            <input
              ref={firstnameDom}
              type="text"
              placeholder="First name"
              className="form-input"
            />
          </div>
          <div className="input-field">
            <input
              ref={lastnameDom}
              type="text"
              placeholder="Last name"
              className="form-input"
            />
          </div>
          <div className="input-field">
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
              className="form-input"
            />
          </div>
          <div className="input-field">
            <input
              ref={passwordDom}
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </div>

          <p className="privacy-text">
            I agree to the{" "}
            <a href="/privacy" className="privacy-link">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="terms-link">
              terms of service
            </a>
            .
          </p>

          <button type="submit" className="submit-button">
            Agree and Join
          </button>
        </form>

        <p className="signin-redirect">
          Already have an account?{" "}
          <a href="/signIn" className="signin-link">
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
