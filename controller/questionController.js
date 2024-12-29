const QuestionModel = require('../models/schemas/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = new QuestionModel(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all questions by testId
exports.getQuestionsByTestId = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ testId: req.params.testId });
    if (!questions.length) {
      return res.status(404).send({ message: 'No questions found for this test.' });
    }
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};
