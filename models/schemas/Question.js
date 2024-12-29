const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Question = model('Question', questionSchema);

module.exports = Question;
