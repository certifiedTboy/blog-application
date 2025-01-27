const {
  newUser,
  checkIfUserWithEmailExist,
  checkIfUserExistById,
} = require("../services/userServices");

// create new user
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check if user with email already exists
    await checkIfUserWithEmailExist(email);

    const user = await newUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({ error: "User creation failed" });
    }

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  try {
    // get current user from DB
    const currentUser = await checkIfUserExistById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User found", currentUser });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const uploadProfileImage = async (req, res) => {
  const { userId } = req.user;
  try {
    const currentUser = await checkIfUserExistById(userId);

    currentUser.profileImage = `images/${req.file.filename}`;

    await currentUser.save();

    return res
      .status(201)
      .json({ message: "Profile image uploaded successfully", currentUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createNewUser, getCurrentUser, uploadProfileImage };
