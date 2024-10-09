import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/AxiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { appState } from "../../App";

const SingleQuestion = () => {
  const { user } = useContext(appState);
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token"); // Fetch the token from localStorage

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        // Make the API call with the token in headers
        const response = await axios.get(`/questions/question/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });

        setQuestion(response.data.question); // Store the fetched question
      } catch (err) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [questionid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {question ? (
        <div>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <small>
            Posted on: {new Date(question.created_at).toLocaleDateString()}
          </small>
        </div>
      ) : (
        <p>No question found.</p>
      )}
    </div>
  );
};

export default SingleQuestion;
