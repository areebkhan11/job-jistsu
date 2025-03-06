const { Schema, model } = require("mongoose");

const testSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Basic", "Moderate", "Advanced"],
      required: true,
    },
    name: { type: String, default: null },
    details: { type: String, default: null },
    image: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Test = model("Test", testSchema);

module.exports = Test;
