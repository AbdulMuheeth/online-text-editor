const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  pathName: { type: String, required: true },
  files: { type: String }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
