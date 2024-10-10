import React, { useState } from "react";
import axios from "../../axiosConfig";
import "./submitAnswer.css"; // Link to CSS
import AnswersList from "../Answer/AnswerList";
import { useNavigate } from "react-router-dom";

const SubmitAnswer = ({ questionid }) => {
  // Receive questionid as prop
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Fetch the auth token
      const response = await axios.post(
        "/answers/answer",
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
      navigate("/allQuestions");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="answer-container">
      <AnswersList />
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
