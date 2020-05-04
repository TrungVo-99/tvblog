const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "topics",
      default: []
    }
  ]
});

module.exports = model("categorys", categorySchema);
