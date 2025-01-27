const express = require("express");
const authRoutes = express.Router();
const {
  loginUser,
  getNewAccessToken,
  logoutUser,
} = require("../controllers/auth.controllers");
const { requireSignin } = require("../middlewares/requireSignin");

authRoutes.post("/login", loginUser);
authRoutes.post("/logout", requireSignin, logoutUser);
authRoutes.get("/access-token", getNewAccessToken);

module.exports = authRoutes;
