
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Components/About/About";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import ForgotPassword  from"./Components/ForgotPassword/ForgotPassword";
import Answer from "./Pages/Answer/Answer"; 

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/About" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
