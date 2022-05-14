
const { MongoClient } = require("mongodb");
const { ATLAS_URI } = require('../config/db.js');
//const ATLAS_URI = "mongodb+srv://simpleforum1:simpleforum1@cluster0.es53x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("forum");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};