const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Record", recordSchema);