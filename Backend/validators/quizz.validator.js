const { body } = require("express-validator");

const validators = {};

validators.createQuizzValidator = [
    body("quizzQA")
    .notEmpty().withMessage("quizz is required")
];

module.exports = validators;