const router = require("express").Router();
const {
  register,
  login,
  resetPassword,
} = require("../controller/authController");

class AuthAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;

    // Public routes for authentication
    router.post("/register", register); // Allow users to self-register
    router.post("/login", login); // Allow users to log in
    router.post("/reset-password", resetPassword); // Reset user password
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/auth";
  }
}

module.exports = AuthAPI;
