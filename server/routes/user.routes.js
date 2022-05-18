
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // RESTRICTED ROUTES
  app.get("/api/get/thread", [authJwt.verifyToken], controller.getThread);
  app.get("/api/get/recentUserThreads", [authJwt.verifyToken], controller.getRecentUserThreads);
  app.get("/api/get/recentThreads", controller.getRecentThreads);
  app.get("/api/get/userProfile/:username", [authJwt.verifyToken], controller.getUserProfile);
  app.post("/api/add/thread", [authJwt.verifyToken], controller.addThread);
  app.post("/api/add/post", [authJwt.verifyToken], controller.addPost);

};