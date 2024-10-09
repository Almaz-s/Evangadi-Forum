import React, { useState } from "react";
import axios from "../../axios/AxiosConfig";
import "./question.css";
import { FaArrowCircleRight } from "react-icons/fa";

const Questions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handlePostQuestion = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assume token is stored in localStorage
      const response = await axios.post(
        "/questions/question",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding Authorization token if required
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.msg); // Show success message from API
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div>
      <h1>Steps To Write A Good Question</h1>
      <hr />
      <ul className="question-steps">
        <li>
          <FaArrowCircleRight />
          Summarize your problems in a one-line title.
        </li>
        <li>
          <FaArrowCircleRight />
          Describe your problem in more detail.
        </li>
        <li>
          <FaArrowCircleRight />
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          <FaArrowCircleRight />
          Review your question and post it here.
        </li>
      </ul>

      <form onSubmit={handlePostQuestion}>
        <div>
          <h2>Post Your Question</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Question detail ..."
            required
          />
        </div>

        <button type="submit">Post Question</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Questions;
