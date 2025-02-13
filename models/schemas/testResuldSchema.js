const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: Schema.Types.ObjectId, ref: "AptitudeTest", required: true },
  selectedAnswers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOption: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  isPassed: { type: Boolean, required: true }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
