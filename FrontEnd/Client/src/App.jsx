import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Components/About/About";
import SignUp from "./Components/SignUp/SignUp";
import Answer from "./Pages/Answer/Answer"; 
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
