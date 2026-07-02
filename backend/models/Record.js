const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Record", recordSchema);