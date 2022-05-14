

const jwt = require("jsonwebtoken");
const db = require("../db/conn");
const secret_key = "test"
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  console.log("It's authJwt.js. Veryfying token... ");
  let token = req.headers["x-access-token"];
  console.log("provided token:" + token);
  if (!token) {
    console.log("oops.. no token provided!");
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      console.log("oops.. no token provided!");
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {

  let db_connect = db.getDb("forum");
  let myquery = { user_id: parseInt(req.userId)};

  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err){ 
            res.status(500).send({ message: err });
            return;
        }
        if(result.isAdmin){
            next();
            return;
        }
        res.status(403).send({ message: "Requires Admin Role!" });
        return;
      });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;