const Blog = require("../models/blog.model");

const getBlogById = async (id) => {
  const blogByIdExist = await Blog.findById(id);

  if (!blogByIdExist) {
    throw new Error("Blog not found");
  }

  return blogByIdExist;
};

module.exports = { getBlogById };
