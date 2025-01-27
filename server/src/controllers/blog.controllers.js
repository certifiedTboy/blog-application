const Blog = require("../models/blog.model");
const getPagination = require("../helpers/pagination");

// create new blog
const createNewBlog = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    // get user data from db
    const blog = new Blog({ title, content, createdBy: userId });

    // save created blog on database
    await blog.save();

    // send error response to client if blog failed to be created
    if (!blog) {
      return res.status(400).json({ error: "Blog creation failed" });
    }

    // send success response to client on blog creation success
    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all blogs
const getAllBlogs = async (req, res) => {
  const { limit, page } = req.query;
  try {
    const paginationResult = getPagination(page, limit);

    const blogs = await Blog.find()
      .skip(paginationResult.offset)
      .limit(paginationResult.limit)
      .populate("createdBy", "firstName lastName email _id")
      .populate({
        path: "comments",
        populate: { path: "createdBy", select: "firstName lastName email _id" },
      });

    // send error response to client if no blog is found
    if (!blogs || blogs.length <= 0) {
      return res.status(404).json({ error: "Not blog found" });
    }

    return res.status(200).json({ message: "blog found successfully", blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get single blog by id
const getBlogById = async (req, res) => {
  const { blogTitle } = req.params;
  try {
    const blog = await Blog.findOne({ title: blogTitle })
      .populate("createdBy", "firstName lastName email _id")
      .populate({
        path: "comments",
        populate: { path: "createdBy", select: "firstName lastName email _id" },
      });

    // send error response to client if no blog is found
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // send success reponse to client if blog with Id exist
    return res.status(200).json({ message: "Blog found successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createNewBlog, getAllBlogs, getBlogById };
