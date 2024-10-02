require('dotenv').config()

const express = require("express");
const app = express();
const port = 2200;

//db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./Routes/UserRoutes.jsx");

// question routes middleware file
const questionRoutes = require("./Routes/QuestionRoutes.jsx");

// question routes middleware file
const answerRoutes = require("./Routes/AnswerRoutes.jsx");

//authentication middleware file
const authMiddleware = require("./MiddleWare/AuthMiddleware.jsx");

//json middleware to extract json data
app.use(express.json());

// user routes middleware

app.use("/api/users", userRoutes);

//question routes middleware??
app.use("/api/questions", authMiddleware, questionRoutes);

//answer routes middleware??
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log("database connection established");
    console.log("listening on http://localhost:${port}");
  } catch (error) {
    console.log(error.message);
  }
}
start();
