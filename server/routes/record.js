
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the (recent - to be implemented) threads with usernames
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("forum");
  db_connect
    .collection("threads")
    .aggregate([{ $lookup: {from : "users", localField: "user_id", foreignField: "user_id", as : "userInfo"}},])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single user by id
recordRoutes.route("/record/getProfile/:username").get(function (req, res) {
  let db_connect = dbo.getDb("forum");
  let myquery = { username: req.params.username};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get a single THREAD by id
recordRoutes.route("/record/getThreadById/:id").get(function (req, res) {
  let db_connect = dbo.getDb("forum");
  let myquery = { _id: ObjectId(req.params.id)};
  db_connect
      .collection("threads")
      .aggregate(
        [
          {
            '$match': {
              '_id': new ObjectId(req.params.id)
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
        res.json(result);
      });

      /*
      example of query returns:
        text: string
        posts: [
          {date: "2016", 
          text: "test", 
          user_id: 1, 
          postAuthor: {
              avatar: "",
              join_date: 2016,
              user_id: 1,
              _id: ObjectId('ffs33'),
              username: "test",
              email: "test",
              password: "hashdfgsgdf"
          }
          },
        ],
        threadAuthors: [
          _id: ObjectId('fsdfsd),
          username: "maya",
          email: "adm",
          password: "test",
          avatar: "empty",
          join_date: 2016,
          user_id: 0
        ]
       */
});

// This section will help you create a new thread.
recordRoutes.route("/record/addThread").post(function (req, response) {
    //TODO some basic auth here
  let db_connect = dbo.getDb("forum");
  let myobj = {
    title: req.body.title,
    date: req.body.date,
    text: req.body.text,
    user_id: req.body.user_id,
    category: req.body.category,
    posts: []
  };
  db_connect.collection("threads").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new post.
recordRoutes.route("/record/addPost").post(function (req, response) {
  //TODO some basic auth here
  let db_connect = dbo.getDb("forum");

  let threadID = {"_id": ObjectId(req.body.thread_id)};
  let myobj = {
    $push: {
      "posts":{
        date: req.body.date,
        text: req.body.text,
        user_id: req.body.user_id
      }
    }
  };
  db_connect.collection("threads").updateOne(threadID, myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new user.
recordRoutes.route("/record/addUser").post(function (req, response) {
  //TODO some basic auth here
let db_connect = dbo.getDb("forum");
let myobj = {
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
  avatar: req.body.avatar,
  join_date: 2016,
};
db_connect.collection("users").insertOne(myobj, function (err, res) {
  if (err) throw err;
  response.json(res);
});
});





// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { _id: ObjectId( req.params.id )};  
  let newvalues = {    
    $set: {      
      name: req.body.name,     
      position: req.body.position,      
      level: req.body.level,    
    }
  }  
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;