// routes/resourceRoutes.js
const { Router } = require('express');
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require('../controller/resourceController');
const authMiddleware = require('../middlewares/Auth');
const { ROLES } = require('../utils/constants');
const { upload } = require('../utils');

class ResourceAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;
    router.post('/',authMiddleware(Object.values(ROLES)), upload('resources').fields([{ name: 'image', maxCount: 1 }]), createResource); // Create a new resource
    router.get('/',authMiddleware(Object.values(ROLES)), getResources); // Get all resources
    router.get('/:id',authMiddleware(Object.values(ROLES)), getResourceById); // Get a resource by ID
    router.put('/:id',authMiddleware(Object.values(ROLES)), updateResource); // Update a resource by ID
    router.delete('/:id',authMiddleware(Object.values(ROLES)), deleteResource); // Delete a resource by ID
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/resources';
  }
}


module.exports = ResourceAPI;
