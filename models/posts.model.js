const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
  title: String,
  dateUpload: String,
  description: String,
  content: String,
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "images",
      default: []
    }
  ],
  newPosts: Boolean
});

module.exports = model("posts", postsSchema);
