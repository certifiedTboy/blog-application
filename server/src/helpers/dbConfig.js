const mongoose = require("mongoose");
const { DB_URI } = require("../lib/index");

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("database connection failed");
  }
};

module.exports = connectDb;
