const Comment = require("../models/comment.model");
const { getBlogById } = require("../services/blogServices");

// Create a new comment
const addCommentToBlog = async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;
  const { userId } = req.user;
  try {
    // query for blog which comment is to be added to id
    const blog = await getBlogById(blogId);

    // created a new comment
    const comment = await Comment.create({ text, createdBy: userId });

    if (!comment) {
      throw new Error("comment creation failed");
    }

    // add comment to blog
    blog.comments.push(comment._id);

    // save update on blog to persist comment id on database
    await blog.save();

    return res.status(201).json({
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "something went wrong" });
  }
};

module.exports = {
  addCommentToBlog,
};
