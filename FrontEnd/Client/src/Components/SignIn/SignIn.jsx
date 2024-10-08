import { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
//  import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function SignIn() {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    // navigate("/"); // Adjust the route as needed
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage(""); // Clear any previous error messages

      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/QuestionDetail");
    } catch (error) {
      console.error("Login failed: ", error.response || error.message);
      setErrorMessage(
        error?.response?.data?.msg || "An unexpected error occurred"
      );
    } finally {
      setProcessing(false);
    }
  }

  const handleIcon = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <section className={classes.loginContainer}>
      <div className={classes.loginContent}>
        <div className={classes.loginForm}>
          <h4>
            Login to your account. Don’t have an account? <br />
            <Link
              to={"/register"}
              style={{
                color: "orange",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "bold",
                fontSize: "18px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#eb8432")}
            >
              Create a new account
            </Link>
          </h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="your email address"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={type} // Use state for input type
                id="password"
                placeholder=" your password"
              />
              <span className={classes.iconContainer} onClick={handleIcon}>
                <Icon className="field-icon" icon={icon} size={18} />
              </span>
            </div>
            <br />
            {errorMessage && (
              <div className={classes.errorMessage}>{errorMessage}</div>
            )}
            <button type="submit" className={classes.Login}>
              {processing ? (
                <div className="loading">
                  <ClipLoader color="orange" size={15} />
                  <span>Please wait...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        <div className={classes.text_content}>
          <h2>About</h2>
          <h1>Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button onClick={handleJoinNowClick} className={classes.how_it_work}>
            HOW IT WORKS
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
