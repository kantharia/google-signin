var mongoose = require("mongoose")

// Create a new schema for our url data
var schema = new mongoose.Schema({
  id : String,
  email : String,
  image : String,
  name : String
});

module.exports = mongoose.model('users', schema);