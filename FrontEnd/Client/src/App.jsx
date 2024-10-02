import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import About from "./Components/About/About";
import SignUp from "./Components/SignUp/SignUp";
import ForgotPassword  from"./Components/ForgotPassword/ForgotPassword";
function App() {
  return (
    <Router>
      <Header />
      <SignUp/>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
