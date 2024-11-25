import VerifySignUp from '../middleware/verifySignUp.js';
import * as controller from "../controllers/authController.js"; // all auth controllers
import authJwt from "../middleware/authJwt.js"


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
      VerifySignUp.checkDuplicateEmail,
      VerifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  
  
  //Login Requires "username" and "password"
  app.post("/api/auth/signin", controller.signin);


  //Get user data
  app.get("/api/auth/getuserdata", authJwt.verifyToken, controller.getUserData )
  
  //Edit user data
  app.put("/api/auth/edituserdata", authJwt.verifyToken, controller.updateUserData)

};
