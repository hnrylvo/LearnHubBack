const { body, param } = require('express-validator')
const validators = {};

validators.createPostValidator = [
    param("identifier")
    .optional()
    .notEmpty().withMessage("identifier is required")
    .isMongoId().withMessage("Indentificador tiene que ser un id de mongo"),
    body("title")
        .notEmpty().withMessage("title is required"),
    body("image")
    .notEmpty().withMessage("La imagen es requerida")
    .isURL().withMessage("Image must be an URL")
];

validators.IdInParamsValidator = [
    param("identifier")
    .notEmpty().withMessage("identifier is required")
    .isMongoId().withMessage("Indentificador tiene que ser un id de mongo")
]

validators.saveCommentValidator = [
    body("comment")
    .notEmpty().withMessage("comment is required")
    .isLength({ max: 280 }).withMessage("El comentario maximo es de 280 caracteres"),
];

module.exports = validators;
