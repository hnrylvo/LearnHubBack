const { validationResult } = require("express-validator");
const Quizz = require("../models/quizz.model");

const controller = {};

controller.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { description, quizzQA, time_limit, user } = req.body;

        const quizz = new Quizz({
            description,
            quizzQA,
            user,
            time_limit,
        });

        const quizzSaved = await quizz.save();
        if (!quizzSaved) {
            return res.status(409).json({ error: "El quizz no se pudo crear correctamente" });
        }

        return res.status(201).json(quizzSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
};

controller.findAll = async (req, res) => {
    try {
        const quizz = await Quizz.find();

        return res.status(200).json({ quizz });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

controller.findOneById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const quizz = await Quizz.findById(identifier);
        if (!quizz) {
            return res.status(404).json({ error: "Quizz no encontrado" });
        }

        return res.status(200).json(quizz);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = controller;
