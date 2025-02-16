// models/schemas/resourceSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;