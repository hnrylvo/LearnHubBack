const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
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

    quizzQA: [{
        question_q: { // Pregunta
            type: String,
            trim: true,
            required: true
        },

        question_af: [{ // Respuestas falsas
            type: String,
            trim: true,
            required: true
        }],

        question_at: { // Respuesta correcta
            type: String,
            trim: true,
            required: true
        }
    }],

    time_limit: {
        type: Number,
    },

}, { timestamps: true });

module.exports = mongoose.model("Quizz", QuizzSchema);
