const { Router } = require("express");

const RootAPI = require("./rootApi");
const AuthAPI = require("./authApi");
const CategoryAPI = require("./categoryApi")
const TestAPI = require("./testApi")
class API {
  constructor(app) {
    this.app = app;
    this.router = Router();
    this.routeGroups = [];
  }

  loadRouteGroups() {
    this.routeGroups.push(new RootAPI());
    this.routeGroups.push(new AuthAPI());
    this.routeGroups.push(new CategoryAPI());
    this.routeGroups.push(new TestAPI());
  }

  setContentType(req, res, next) {
    res.set("Content-Type", "application/json");
    next();
  }

  registerGroups() {
    this.loadRouteGroups();
    this.routeGroups.forEach((rg) => {
      console.log("Route group: " + rg.getRouterGroup());
      this.app.use(
        "/api" + rg.getRouterGroup(),
        this.setContentType,
        rg.getRouter()
      );
    });
  }
}

module.exports = API;
