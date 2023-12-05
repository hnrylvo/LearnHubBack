const express = require("express");
const router = express.Router();

const postRouter = require ("./post.router");
const authRouter = require ("./auth.router");
const quizzRouter = require ("./quizz.router");
const examsRouter = require("./exam.router");


router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/quizz", quizzRouter);
router.use("/exams", examsRouter);


module.exports = router;