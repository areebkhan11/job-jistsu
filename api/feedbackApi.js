// routes/feedbackRoutes.js
const { Router } = require("express");
const {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controller/feedbackController");
const authMiddleware = require("../middlewares/Auth");
const { ROLES } = require("../utils/constants");
const { upload } = require("../utils");

class FeedbackAPI {
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    let router = this.router;
    router.post(
      "/",
      authMiddleware(Object.values(ROLES)),
      upload("feedbacks").single("image"),
      createFeedback
    );
    router.get("/", authMiddleware(Object.values(ROLES)), getFeedbacks);
    router.get("/:id", authMiddleware(Object.values(ROLES)), getFeedbackById);
    router.put(
      "/:id",
      authMiddleware(Object.values(ROLES)),
      upload("feedbacks").single("image"),
      updateFeedback
    );
    router.delete("/:id", authMiddleware(Object.values(ROLES)), deleteFeedback);
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/feedbacks";
  }
}

module.exports = FeedbackAPI;
