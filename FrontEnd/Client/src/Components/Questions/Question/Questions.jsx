import React, { useState } from "react";
import axios from "../../../axiosConfig";
import "./PostQuestion.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./PostQuestion.module.css"

const Questions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

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
      navigate("/allQuestions");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Steps To Write A Good Question</h1>
      <hr className={styles.divider} />
      <ul className={styles.questionSteps}>
        <li>
          <FaArrowCircleRight className={styles.icon} />
          Summarize your problems in a one-line title.
        </li>
        <li>
          <FaArrowCircleRight className={styles.icon} />
          Describe your problem in more detail.
        </li>
        <li>
          <FaArrowCircleRight className={styles.icon} />
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          <FaArrowCircleRight className={styles.icon} />
          Review your question and post it here.
        </li>
      </ul>

      <form onSubmit={handlePostQuestion} className={styles.form}>
        <div>
          <h2 className={styles.subtitle}>Post Your Question</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            className={styles.input}
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Question detail ..."
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Post Question
        </button>
      </form>

      {responseMessage && (
        <p className={styles.responseMessage}>{responseMessage}</p>
      )}
    </div>
  );
};

export default Questions;
