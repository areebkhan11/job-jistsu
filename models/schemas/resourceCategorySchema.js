const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceCategorySchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

const ResourceCategory = mongoose.model('ResourceCategory', resourceCategorySchema);

module.exports = ResourceCategory;
