import React from "react";
import "./home.css";
import backgroundImage from "../../assets/image/evangadi-home-background.svg"; 
import illustration from "../../assets/image/10002.png"; 
const Home = () => {
  return (
    <div className="home-page">
      <div className="text-content">
        <h3>
          Evangadi <br />
          Forum
        </h3>
        <p>
          Welcome to Evangadi Forum—your premier tech community for global
          networking and learning. Join us to connect with peers, collaborate on
          projects, and enhance your professional growth. Explore the features
          that can elevate your tech journey today.
        </p>
        <a href="/SignUp" className="join-btn">
          Join Now
        </a>
      </div>

      {/* Image container */}
      <div className="image-content">
        <img
          src={illustration}
          alt="Discussion illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default Home;
