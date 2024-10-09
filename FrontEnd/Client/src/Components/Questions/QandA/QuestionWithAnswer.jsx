import React from "react";
import AnswersList from "../Answers/AnswerLists";
import SingleQuestion from "./SingleQuestion";

const SingleQuestionWithAnswers = () => {
  return (
    <div>
      <SingleQuestion />
      <AnswersList />
    </div>
  );
};

export default SingleQuestionWithAnswers;
