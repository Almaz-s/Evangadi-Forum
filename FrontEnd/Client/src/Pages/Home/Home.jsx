import React from "react";
import "./home.css";
import backgroundImage from "../../assets/image/bg-svg-f.svg"; // Ensure the path is correct

const Home = () => {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>
        Evangadi <br />
        Forum
      </h3>
      <p>
        Welcome to Evangadi Forum—your premier tech community for global
        networking and learning. Join us to connect with peers, collaborate on
        projects, and enhance your professional growth. Explore the features
        that can elevate your tech journey today
      </p>
      <a href="/SignUp" className="join-btn">
        Join Now
      </a>
    </div>
  );
};

export default Home;
