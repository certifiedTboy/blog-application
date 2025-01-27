const express = require("express");
const { addCommentToBlog } = require("../controllers/comment.controllers");
const { requireSignin } = require("../middlewares/requireSignin");
const commentRoutes = express.Router();

commentRoutes.post("/:blogId", requireSignin, addCommentToBlog);

module.exports = commentRoutes;
