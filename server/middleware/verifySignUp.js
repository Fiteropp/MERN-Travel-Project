import User from "../models/user.model";
import db from "../models"

const ROLES = db.ROLES;

CheckDuplicate = (req, res, next) =>{
    //Check Username
    User.findOne({
        username: req.body.username
    }).exec((err,user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            res.status(400).send({message: "Error! Username already in use!" });
        }
    
    //Check Email
    User.findOne({
        email: req.body.email
    }).exec((err,user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if(user) {
            res.status(400).send({message: "Error! Email already in use!" });
        }

        next();
        
        });
    });
};


//Check if role exists
CheckRoles = (req, res, next) => {
    if(req.body.roles) {
        for( let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
                message: `Error! Provided Role ${req.body.roles[i]} does not exist!`
            });
            
            return;
        }
    }
 }

 next();

};

const VerifySignUp = {
    CheckDuplicate,
    CheckRoles
};

export default VerifySignUp;