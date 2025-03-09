const { Router } = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controller/resourceCategoryController');

class RspirceCategoryAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;

    router.post('/', createCategory); // Create a new category
    router.get('/', getCategories); // Get all categories
    router.get('/:id', getCategoryById); // Get a category by ID
    router.put('/:id', updateCategory); // Update a category by ID
    router.delete('/:id', deleteCategory); // Delete a category by ID
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return '/resource-categories';
  }
}

module.exports = RspirceCategoryAPI;
