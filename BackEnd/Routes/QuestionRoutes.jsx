const express = require("express");
const router = express.Router();

//authentication middleware
const authMiddleware = require("../MiddleWare/AuthMiddleware.jsx");

router.get("/all-questions", (req, res) => {
  res.send("all questions.");
});
module.exports = router;
