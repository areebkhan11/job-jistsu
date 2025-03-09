const FeedbackModel = require("../models/schemas/feedback");
const fs = require("fs");
const path = require("path");

exports.createFeedback = async (req, res) => {
  try {
    const { file } = req;
    const image = file ? file.path : null;
    const userId = req.user.id;
    const feedback = new FeedbackModel({
      ...req.body,
      image,
      userId
    });
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 }).populate('userId', 'firstName lastName image') ;
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    res.status(200).send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }

    let updateData = { ...req.body };
    if (req.file) {
      if (feedback.image) {
        const oldImagePath = path.join(__dirname, "../uploads/feedbacks", feedback.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.path;
    }

    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updatedFeedback);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send({ message: "Feedback not found" });
    }
    res.status(200).send({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
