import VerifySignUp from '../middleware/verifySignUp.js';
import * as controller from "../controllers/authController.js"; // all auth controllers

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Bearer, Origin, Content-Type, Accept"
    );
    next();
  });

  
  //Registration requires "email", "username" and "password"
  app.post(
    "/api/auth/signup",
    [
      VerifySignUp.checkDuplicateUsernameOrEmail,
      VerifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  
  
  //Login Requires "username" and "password"
  app.post("/api/auth/signin", controller.signin);
};
