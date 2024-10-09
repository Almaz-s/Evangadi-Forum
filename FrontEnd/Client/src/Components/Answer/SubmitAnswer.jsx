import React, { useState } from "react";
import axios from "../../axios/AxiosConfig";
import "./SubmitAnswer.css"; // Add this to link the CSS

const SubmitAnswer = ({ questionid }) => {
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Fetch the auth token
      const response = await axios.post(
        "/answer",
        {
          questionid,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(response.data.msg); // Display success message
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="answer-container">
      <div></div>
      <h2>Answer From The Community</h2>
      <form onSubmit={handleSubmit} className="answer-form">
        <textarea
          className="answer-input"
          placeholder="Your answer ..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Post Answer
        </button>
      </form>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default SubmitAnswer;
