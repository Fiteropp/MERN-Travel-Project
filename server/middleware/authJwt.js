import jwt from 'jsonwebtoken';
import db from "../models";
import 'dotenv/config'

const User = db.user;
const Role = db.role;


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({ message: "Error, no token provided"});
    }

    jwt.verify(token,
        process.env.SECRET_TOKEN,
        (err, decoded) =>{
            if(err) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };
  
isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  };
  
checkModeratorOrAdmin = (req, res, next) => {
    if (isModerator(req, res, () => {}) || isAdmin(req, res, () => {})) {
      return next();
    }
    return res.status(403).json({ message: "Require Moderator or Admin role!" });
  };

  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    checkModeratorOrAdmin
  };
 
export default authJwt;