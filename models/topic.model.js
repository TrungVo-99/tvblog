const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  name: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
      default: []
    }
  ]
});

module.exports = model("topics", topicSchema);
