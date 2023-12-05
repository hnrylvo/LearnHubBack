const { body } = require("express-validator");


const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
    body("username")
        .notEmpty().withMessage("Se requiere nombre de usuario")
        .isLength({ min: 4, max: 32 }).withMessage("Formato de usuario incorrecto"),
    body("email")
        .notEmpty().withMessage("Se requiere un correo electronico")
        .isEmail().withMessage("El formato del correo electronico es incorrecto"),
    body("password")
        .notEmpty().withMessage("Se requiere de una contraseña")
        .matches(passwordRegexp).withMessage("Formato de contraseña no valido") 
];

module.exports = validators;