
const db = require("../db/conn");
const User = db.user;
const Role = db.role;
const secret_key = "test";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    avatar: "test",
    joinDate: 2021
  };

  console.log("signup");
  let db_connect = db.getDb("forum");

  db_connect.collection("users").insertOne(user, function (err, result) {
    if (err){
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });

};

exports.signin = async (req, res) => {
    let db_connect = db.getDb("forum");
    let myquery = { username: req.body.username};

    let user = {};
    console.log("new request, username:" + req.body.username + ", password:" + req.body.password)

    db_connect
      .collection("users")
      .findOne(myquery, function (err, user) {
        if (err){ 
            res.status(500).send({ message: err });
            return;
        }
        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        
        if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
        }

        var token = jwt.sign({ id: user.user_id }, secret_key, {
        expiresIn: 86400 // 24 hours
        });
        
        res.status(200).send({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        accessToken: token
        });
        console.log(user.user_id + " Logged successfully")

    });

};