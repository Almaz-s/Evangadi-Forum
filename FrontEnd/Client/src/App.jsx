import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import About from "./Components/About/About";
import SignIn from "./Components/SignIn/SignIn";
import React, { useState, useEffect, createContext } from "react";
import axios from "../src/API/axiosConfig";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token, // Make sure there is a space after "Bearer"
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      // Here, instead of using `useNavigate`, we use <Navigate>
      setUser(null); // Assuming you want to set an invalid user as `null`
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <Header />
      <AppState.Provider value={{ user, setUser }}>
        <Routes>
          {/* Conditional route, redirect to SignIn if user is not authenticated */}
          <Route
            path="/"
            element={user?.username ? <Home /> : <Navigate to="/SignIn" />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/SignIn" element={<SignIn />} />
          {/* Add a redirect route to handle unmatched URLs */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppState.Provider>
      <Footer />
    </Router>
  );
}

export default App;
