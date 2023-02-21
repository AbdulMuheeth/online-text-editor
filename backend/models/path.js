const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
  pathName: { type: String, required: true },
  password: { type: String, required: true },
});

const Path = mongoose.model("Path", pathSchema);

module.exports = Path;