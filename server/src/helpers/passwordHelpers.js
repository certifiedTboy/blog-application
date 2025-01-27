const bcrypt = require("bcryptjs");

// generate encrypted password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hashSync(password, salt);

  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
