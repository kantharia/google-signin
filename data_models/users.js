var mongoose = require("mongoose")

// Create a new schema for our url data
var schema = new mongoose.Schema({
  id     : String,
  email  : String,
  image  : String,
  name   : String,
  online : Boolean
});

module.exports = mongoose.model('users', schema);