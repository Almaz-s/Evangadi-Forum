import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Answer from "./Pages/Answer/Answer";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import axios from "./axiosConfig"; // Import axios for API requests
import { useEffect, useState, createContext } from "react"; // Import hooks and context API
import Home from "./Components/Home/Home";

export const AppState = createContext(); // Create context for global state

function App() {
  const [user, setUser] = useState(null); // State to store user information
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate(); // Hook to navigate between routes

  async function checkUser() {
    const token = localStorage.getItem("token"); // Get token from local storage

    // Redirect to SignIn if no token exists
    if (!token) {
      setLoading(false);
      navigate("/SignIn");
      return;
    }

    try {
      const { data } = await axios.get("users/check", {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      if (data?.user) {
        setUser(data.user); // Set user data if valid
      } else {
        navigate("/SignIn"); // Redirect to SignIn if user is invalid
      }
    } catch (error) {
      console.log(error.response); // Log error
      navigate("/SignIn"); // Redirect to SignIn on error
    } finally {
      setLoading(false); // Set loading to false after check
    }
  }

  useEffect(() => {
    checkUser(); // Check user authentication on component mount
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />{" "}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Answer" element={<Answer />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />{" "}
        <Route path="/allQuestions" element={<Home />} />
      </Routes>
      <Footer /> {/* Render footer component */}
    </AppState.Provider>
  );
}

export default App;
