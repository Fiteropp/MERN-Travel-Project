import authJwt from '../middleware/authJwt.js';
import * as controller from "../controllers/userController.js"; // all auth controllers

export default (app) => {
    
    //To check if user is moderator or admin = authJwt.checkModeratorOrAdmin
    //To check if user is moderator = authJwt.isModerator
    //To check if user is admin = authJwt.isAdmin

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