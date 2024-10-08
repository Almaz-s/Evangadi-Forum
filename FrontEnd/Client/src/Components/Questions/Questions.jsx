import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios/AxiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./QuestionList.css";
import { appState } from "../../App";

const QuestionList = () => {
  const { user } = useContext(appState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/allQuestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response.data.questions);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch questions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="question-list-container">
      <div className="top-bar">
        <button className="ask-question-btn">Ask Question</button>
        <div className="welcome-message">
          Welcome: <span className="username">{user.username}</span>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search question"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="question-items">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div className="question-item" key={question.questionid}>
              <div className="user">
                <FaUserCircle className="user-icon" />
                <p className="question-author">{question.username}</p>
              </div>
              <div className="question-content">
                <p className="question-title">{question.title}</p>
              </div>
              <IoIosArrowForward className="arrow-icon" />
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
