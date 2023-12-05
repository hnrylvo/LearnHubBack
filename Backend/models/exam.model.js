const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "instructor",
        required: true
    },

    examQA: [{
        question_e: { // Pregunta
            type: String,
            trim: true,
            required: true
        },

        question_afe: [{ // Respuestas falsas
            type: String,
            trim: true,
            required: true
        }],

        question_ate: { // Respuesta correcta
            type: String,
            trim: true,
            required: true
        }
    }],

    time_limit_e: {
        type: Number,
    },

}, { timestamps: true });

module.exports = mongoose.model("Exam", ExamSchema);
