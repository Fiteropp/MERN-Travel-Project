import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/adminController.js"; // all auth controllers

export default (app) => {
  //List all users
  app.get(
    "/api/admin/listallusers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.listAllUsers
  );

  //Get User By ID
  app.get(
    "/api/admin/getuser/:userid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserDataById
  );
  
  //Edit User Data By Id
  app.post(
    "/api/admin/edituserrole/:userid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editUserRole
  );

  //Add Moderator By Id
  app.post(
    "/api/admin/addmoderator/:hotelid/:modid",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addModToHotel
  );
};
