const { Schema, model } = require("mongoose");

const testSchema = new Schema({
    testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    difficultyLevel: { type: String, enum: ['Basic', 'Moderate', 'Advanced'], required: true },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });
  
  const Test = model('Test', testSchema);
  
  module.exports = Test;
  