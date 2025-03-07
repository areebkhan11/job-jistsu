// models/schemas/resourceSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const restrictionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Restriction = mongoose.model('Restriction', restrictionSchema);
module.exports = Restriction;