const mongoose = require("mongoose");

mongoose.Promise = Promise;

const pair = new mongoose.Schema({
  donor: {
    type: Object,
    required: true,
    index: {
      unique: true
    }
  },
  recepient: {
    type: Object,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = mongoose.model("pairs", pair);