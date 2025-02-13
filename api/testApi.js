const { Router } = require('express');
const {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
  getTestsByDifficulty,
  testSubmition
} = require('../controller/testController');
const authMiddleware = require('../middlewares/Auth');
const { ROLES } = require('../utils/constants');

class TestAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;

    router.post('/', createTest); // Create a new test
    router.get('/', getTests); // Get all tests
    router.get('/:id', getTestById); // Get a test by ID
    router.put('/:id', updateTest); // Update a test by ID
    router.delete('/:id', deleteTest); // Delete a test by ID
    router.get('/category/:categoryId', getTestsByDifficulty); // Get tests by difficulty within a category
    router.post('/submit-test',authMiddleware(Object.values(ROLES)), testSubmition); // Get tests by difficulty within a category
  }
  
  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/tests';
  }
}

module.exports = TestAPI;
