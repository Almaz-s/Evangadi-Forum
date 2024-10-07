// db connection
const dbConnection = require("../db/dbConfig");
//import StatusCodes
const { StatusCodes } = require("http-status-codes");

// Function to create a new question
async function registerQuestion(req, res) {
  const { title, description } = req.body;

  // Check if all required fields are provided
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const result = await dbConnection.query(
      "INSERT INTO questions (title, description, userid) VALUES (?, ?, ?)",
      [title, description, req.user.userid] // Assuming req.user contains authenticated user info
    );
    console.log(result);
    const insertedId = result[0].insertId;
    if (!insertedId) {
      throw new Error("Insert operation failed, no id was returned");
    }

    // Update the questionid using the newly generated id
    await dbConnection.query(
      "UPDATE questions SET questionid = CONCAT('Q-', ?) WHERE id = ?",
      [insertedId, insertedId]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

// Function to retrieve all questions
async function allQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT questions.questionid, questions.title, questions.description, users.username, questions.created_at 
       FROM questions
       JOIN users ON questions.userid = users.userid`
    );

    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Not Found", message: "No questions found." });
    }

    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Function to retrieve a single question by question_id
async function singleQuestion(req, res) {
  const { questionid } = req.params;
  console.log(req.params);
  try {
    const [result] = await dbConnection.query(
      `SELECT questionid, title, description, userid
       FROM questions 
       WHERE questionid = ?`,
      [questionid]
    );
    console.log(result);
    if (result.length === 0) {
      console.log("Not Found");
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json({ question: result[0] });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { registerQuestion, allQuestions, singleQuestion };
