const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;
const moment = require('moment');

  
  exports.allAccess = (req, res) => {
    //res.status(200).send(component);
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


  exports.addPost = (req, res) => {
    let db_connect = dbo.getDb("forum");
    let threadID = {"_id": ObjectId(req.body.thread_id)};
    let myobj = {
      $push: {
        "posts":{
          date: req.body.date,
          text: req.body.text,
          user_id: req.userId, //provided by authJwt, server-side
        }
      }
    };
    db_connect.collection("threads").updateOne(threadID, myobj, function (err, result) {
      if (err) throw err;
        res.json(result);
    });

  };




  exports.addThread = (req, res) => {
    let now = moment();
    let date = `${now.format("HH:mm:ss")}, ${now.format("YYYY-MM-DD")}`;

    let db_connect = dbo.getDb("forum");
    let myobj = {
      title: req.body.title,
      date: date,
      text: req.body.text,
      user_id: req.userId, //provided by authJwt, server-side
      category: req.body.category,
      posts: []
    };

    console.log("Adding thread with name:" + req.body.title);
    db_connect.collection("threads").insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.json(result);
  });


  };




  exports.getThread = (req, res) => {
    let db_connect = dbo.getDb("forum");
    let myquery = { _id: ObjectId(req.query.id)};
    console.log("Hey, it's user.controller.js. calling db to look for id: " + req.query.id);

    db_connect
    .collection("threads")
    .aggregate(
      [
        {
          '$match': {
            '_id': new ObjectId(req.query.id)
          }
        }, {
          '$unwind': {
            'path': '$posts', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'posts.user_id', 
            'foreignField': 'user_id', 
            'as': 'posts.postAuthor'
          }
        }, {
          '$unwind': {
            'path': '$posts.postAuthor', 
            'includeArrayIndex': 'string', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'user_id': {
              '$first': '$user_id'
            }, 
            'category': {
              '$first': '$category'
            }, 
            'title': {
              '$first': '$title'
            }, 
            'date': {
              '$first': '$date'
            }, 
            'text': {
              '$first': '$text'
            }, 
            'posts': {
              '$push': {
                '$cond': [
                  {
                    '$ne': [
                      '$posts', {}
                    ]
                  }, '$posts', '$noval'
                ]
              }
            }
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'user_id', 
            'foreignField': 'user_id', 
            'as': 'threadAuthors'
          }
        }
      ]
      
      )
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("Hey, it's user.controller again! Sending back result: " );
      console.log(result);
      res.status(200).send(result);
    });
  }

  exports.getRecentUserThreads = (req, res) => {
    let db_connect = dbo.getDb("forum");
    let myquery = { _id: ObjectId(req.query.id)};
    console.log("Hey, it's user.controller.js. calling db to look for recent threads of user: " + req.query.id);

    db_connect
    .collection("threads")
    .aggregate(
      [
        {
          '$match': {
            'user_id': req.query.id
          }
        }, {
          '$limit': 5
        }
      ]
      )
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("Hey, it's user.controller again! Sending back result: " );
      console.log(result);
      res.status(200).send(result);
    });
  }

  exports.getTags = (req, res) => {
    let db_connect = dbo.getDb("forum");
    let myquery = { _id: ObjectId(req.query.id)};
    console.log("Hey, it's user.controller.js. calling db to look for recent tags " + req.query.id);

    db_connect
    .collection("threads")
    .aggregate(
      [
        {
          '$match': {
            'user_id': req.query.id
          }
        }, {
          '$limit': 5
        }
      ]
      )
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("Hey, it's user.controller again! Sending back result: " );
      console.log(result);
      res.status(200).send(result);
    });
  }


  exports.getRecentThreads = (req, res) => {
    let db_connect = dbo.getDb("forum");
    let myquery = { _id: ObjectId(req.query.id)};
    console.log("Hey, it's user.controller.js. calling db to look for recent threads " + req.query.id);

    db_connect
    .collection("threads")
    .aggregate([{ $lookup: {from : "users", localField: "user_id", foreignField: "user_id", as : "userInfo"}},])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

  }


  exports.getUserProfile = (req, res) => {
    let db_connect = dbo.getDb("forum");
    console.log("Hey, it's user.controller.js. calling db to look for user profile!! " + req.query.id);
    let myquery = { username: req.params.username};
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });

  }
