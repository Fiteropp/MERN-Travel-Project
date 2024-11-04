import authJwt from '../middleware/authJwt.js';
import * as controller from "../controllers/userController.js"; // all auth controllers

export default (app) => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Bearer, Origin, Content-Type, Accept"
      );
      next();
    });
    //These are for authrorization test purposes only!
    app.get("/api/test/all", controller.allAccess);
  
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  
    app.get(
      "/api/test/mod",
      [authJwt.verifyToken, authJwt.isModerator],
      controller.moderatorBoard
    );
  
    app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
    );
  };