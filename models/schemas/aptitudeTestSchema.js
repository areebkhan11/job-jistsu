const mongoose = require("mongoose");

const AptitudeTestSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: { type: Array, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("AptitudeTest", AptitudeTestSchema);
