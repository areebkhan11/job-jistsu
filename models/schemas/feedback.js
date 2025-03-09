const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String},
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

feedbackSchema.methods.isExpired = function () {
    return Date.now() - this.createdAt > Number(process.env.OTP_EXPIRATION);
}

const FeedbackModel = model("Feedback", feedbackSchema);

module.exports = FeedbackModel;
