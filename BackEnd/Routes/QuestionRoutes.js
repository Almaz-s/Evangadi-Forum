const express = require("express");
const router = express.Router();
const {
  registerQuestion,
  allQuestions,
  singleQuestion,
} = require("../controller/QuestionController");

//authentication middleware
const authMiddleware = require("../MiddleWare/AuthMiddleware.js");

//Post question
router.post("/question", authMiddleware, registerQuestion);

//get all questions
router.get("/allQuestions", authMiddleware, allQuestions);

//get single question
router.get("/singleQuestions", authMiddleware, singleQuestion);

module.exports = router;
