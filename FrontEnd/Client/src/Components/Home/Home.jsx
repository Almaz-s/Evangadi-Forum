import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./Home.css";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
// declares
const Home = () => {
  // define state
  const { user } = useContext(AppState); // to retrieve the user object from app state
  const [questions, setQuestions] = useState([]); // holds the list of fetched questions
  const [loading, setLoading] = useState(false); // boolean to indicate if data is being fetched
  const [error, setError] = useState(null); // holds any error messages during fetching
  const [searchTerm, setSearchTerm] = useState(""); // for searching questions

  // Fetch questions from the backend
  const[currentPage, setCurrentPage] = useState(1); // for pagination
  const questionsPerPage = 5; // number of questions per page

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/allquestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Filtering questions
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic: calculate the start and end indices for the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="question-list-container">
          <div className="top-bar">
            <Link to="/question">
              <button className="ask-question-btn">Ask Question</button>
            </Link>

            <div className="welcome-message">
              Welcome: <span className="username">{user?.username}</span>
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
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <div className="question-item" key={question.questionid}>
                  <div className="user">
                    <FaUserCircle className="user-icon" />
                    <p className="question-author">{question.username}</p>
                  </div>
                  <div className="question-content">
                    <Link to={`/question/${question.questionid}`}>
                      <p className="question-title">{question.title}</p>
                    </Link>
                  </div>
                  <Link to={`/question/${question.questionid}`}><IoIosArrowForward className="arrow-icon" />
                  </Link>
                  
                </div>
              ))
            ) : (
              <p>No questions found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
