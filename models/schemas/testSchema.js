const { Schema, model } = require("mongoose");

const testSchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    difficultyLevel: { type: String, enum: ['Basic', 'Moderate', 'Advanced'], required: true },
    questions: [{
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true }
    }],
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });
  
  const Test = model('Test', testSchema);
  
  module.exports = Test;
  