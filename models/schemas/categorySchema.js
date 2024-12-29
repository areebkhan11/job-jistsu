const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  difficultyLevels: { type: [String], enum: ['Basic', 'Moderate', 'Advanced'], default: ['Basic', 'Moderate', 'Advanced'] }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
