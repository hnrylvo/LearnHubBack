const { validationResult } = require("express-validator");
const Exam = require("../models/exam.model");


const controller = {};

controller.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { description, examQA, time_limit_e, user } = req.body;

        const exam = new Exam({
            description,
            examQA,
            user,
            time_limit_e,
        });

        const examSaved = await exam.save();
        if (!examSaved) {
            return res.status(409).json({ error: "El examen no se pudo crear correctamente" });
        }

        return res.status(201).json(examSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
};

controller.findAll = async (req, res) => {
    try {
        const exam = await Exam.find();

        return res.status(200).json({ exam });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

controller.findOneById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const exam = await Exam.findById(identifier);
        if (!exam) {
            return res.status(404).json({ error: "Examen no encontrado" });
        }

        return res.status(200).json(exam);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = controller;

