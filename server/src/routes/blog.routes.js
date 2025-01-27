const express = require("express");
const {
  createNewBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blog.controllers");
const {
  blogDataValidationRules,
  checkValidationError,
} = require("../middlewares/dataValidator");
const { sanitizeData } = require("../middlewares/dataSanitizer");
const { requireSignin } = require("../middlewares/requireSignin");
const blogRoutes = express.Router();

// create a new blog
blogRoutes.post(
  "/",
  requireSignin,
  blogDataValidationRules,
  checkValidationError,
  sanitizeData,
  createNewBlog
);

// get all blogs on database
blogRoutes.get("/", getAllBlogs);

// get single blog by id
blogRoutes.get("/:blogTitle", getBlogById);

module.exports = blogRoutes;
