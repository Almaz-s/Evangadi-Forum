import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/AxiosConfig";

const AnswersList = () => {
  const { questionid } = useParams(); // Extract questionid from the URL
  const [answers, setAnswers] = useState([]); // State to store answers
  const [newAnswer, setNewAnswer] = useState(""); // State for new answer input
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch answers when component mounts or when questionid changes
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch the auth token
        const response = await axios.get(`answers/answer/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        });
        setAnswers(response?.data?.answers); // Set answers in state
        setLoading(false); // Stop loading once answers are fetched
      } catch (error) {
        setError(
          error.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false); // Stop loading if an error occurs
      }
    };

    if (questionid) {
      fetchAnswers();
    }
  }, [questionid]);

  // Submit a new answer
  const handleSubmitAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/answer",
        {
          questionid,
          answer: newAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewAnswer(""); // Clear the answer input
      await fetchAnswers(); // Refresh answers after submitting
    } catch (err) {
      setError("Failed to post the answer.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading answers...</p>;

  return (
    <div>
      <h3>Answers From The Community</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul>
            {answers.map((answer) => (
              <li key={answer.answerid}>
                <small>{answer.username}</small>
                <p>{answer.answer}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="answer-form">
        <input
          type="text"
          placeholder="Your answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={handleSubmitAnswer}>Post Answer</button>
      </div>
    </div>
  );
};

export default AnswersList;
