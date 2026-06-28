const Data = require("../models/Record.js");

const isDuplicate = async (content) => {
  const existing = await Data.findOne({ content });
  return !!existing;
};

module.exports = isDuplicate;