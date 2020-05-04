const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  path: String,
  dateUpload: String
});

module.exports = model("images", imageSchema);
