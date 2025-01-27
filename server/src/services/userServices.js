const { hashPassword } = require("../helpers/passwordHelpers");
const User = require("../models/user.model");

// create new user function
const newUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);

  const newUserData = { ...userData, password: hashedPassword };
  const newUser = await User.create(newUserData);

  if (!newUser) {
    throw new Error("User creation failed");
  }

  return newUser;
};

// get user by email
const checkIfUserWithEmailExist = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User with email already exists");
  }
};

/**
 * @method getUserByEmail
 * @param {String} email
 * @returns {Promise}
 */
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User with email does not exist");
  }

  return user;
};

/**
 * @method checkIfUserExistById
 * @param {String} userId
 * @returns {Promise}
 */

const checkIfUserExistById = async (userId) => {
  const user = await User.findById(userId).select("-password").select("-__v");

  if (!user) {
    throw new Error("User with id does not exist");
  }

  return user;
};

module.exports = {
  newUser,
  checkIfUserWithEmailExist,
  getUserByEmail,
  checkIfUserExistById,
};
