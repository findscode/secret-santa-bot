const mongoose = require("mongoose");

mongoose.Promise = Promise;

const participant = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },    
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = mongoose.model("participants", participant);