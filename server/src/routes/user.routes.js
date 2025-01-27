const express = require("express");
const {
  createNewUser,
  getCurrentUser,
  uploadProfileImage,
} = require("../controllers/user.controllers");
const {
  userDataValidationRules,
  checkValidationError,
} = require("../middlewares/dataValidator");
const upload = require("../middlewares/multer");
const { requireSignin } = require("../middlewares/requireSignin");

const userRoutes = express.Router();

// add new user
userRoutes.post(
  "/",
  userDataValidationRules,
  checkValidationError,
  createNewUser
);

// get logged in user
userRoutes.get("/logged-in-user", requireSignin, getCurrentUser);

userRoutes.patch(
  "/profile-upload",
  requireSignin,
  upload.single("imageFile"),
  uploadProfileImage
);

module.exports = userRoutes;
