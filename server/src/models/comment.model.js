const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
