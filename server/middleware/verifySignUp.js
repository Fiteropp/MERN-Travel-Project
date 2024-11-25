import User from "../models/user.js";
import db from "../models/index.js";

const ROLES = db.ROLES;

const checkDuplicateEmail = async (req, res, next) => {
  try {
    
    // Check for email in request
    if (req.body.email) {
      const userByEmail = await User.findOne({ email: req.body.email });
      if (userByEmail) {
        return res.status(400).send({ message: "Error! Email already in use!" });
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (Array.isArray(req.body.roles)) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Error! Provided Role ${req.body.roles[i]} does not exist!`,
        });
      }
    }
  }
  next();
};


const VerifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
};

export default VerifySignUp;
