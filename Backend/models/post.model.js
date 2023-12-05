const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    review: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            qualification: {
                type: [Number]
            },

            timestamps: {
                type: Date,
                required: true,
            },
            history: {
                type: [String],
                default: []
            }
        }],
        default: []
    }
}, { tiemstamps: true });

module.exports = Mongoose.model("api-prueba", PostSchema);