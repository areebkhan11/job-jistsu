const { Router } = require('express');
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controller/profileController');
const authMiddleware = require('../middlewares/Auth');
const { ROLES } = require('../utils/constants');


class ProfileAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;

    router.post('/', authMiddleware(Object.values(ROLES)), createProfile); // Create a new profile
    router.get('/', authMiddleware(Object.values(ROLES)), getProfile); // Get all profiles
    router.put('/:id', authMiddleware(Object.values(ROLES)), updateProfile); // Update a profile by ID
    router.delete('/:id',authMiddleware(Object.values(ROLES)), deleteProfile); // Delete a profile by ID
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/profiles';
  }
}

module.exports = ProfileAPI;
