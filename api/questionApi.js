const { Router } = require('express');
const {
  createQuestion,
  getQuestionsByTestId,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} = require('../controller/questionController');

class QuestionAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;

    router.post('/', createQuestion); // Create a new question
    router.get('/test/:testId', getQuestionsByTestId); // Get all questions by testId
    router.get('/:id', getQuestionById); // Get a question by ID
    router.put('/:id', updateQuestion); // Update a question by ID
    router.delete('/:id', deleteQuestion); // Delete a question by ID
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/questions'; // Route group for questions
  }
}

module.exports = QuestionAPI;
