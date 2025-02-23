// routes/resourceRoutes.js
const { Router } = require('express');
const {
  createRestriction,
  getRestrictions,
    getRestrictionById,
    updateRestriction,
    deleteRestriction,
} = require('../controller/restrictionController');
const authMiddleware = require('../middlewares/Auth');
const { ROLES } = require('../utils/constants');
const { upload } = require('../utils');

class RestrictionAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;
    router.post('/',authMiddleware(Object.values(ROLES)), upload('restriction').fields([{ name: 'image', maxCount: 1 }]), createRestriction); // Create a new resource
    router.get('/',authMiddleware(Object.values(ROLES)), getRestrictions); // Get all resources
    router.get('/:id',authMiddleware(Object.values(ROLES)), getRestrictionById); // Get a resource by ID
    router.put('/:id',authMiddleware(Object.values(ROLES)), updateRestriction); // Update a resource by ID
    router.delete('/:id',authMiddleware(Object.values(ROLES)), deleteRestriction); // Delete a resource by ID
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/restrictions';
  }
}


module.exports = RestrictionAPI;
