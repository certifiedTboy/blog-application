const jwt = require("jsonwebtoken");

/**
 * @method generateToken
 * @param {Object} payload
 * @param {String} secret
 * @param {String} expiresIn
 * @returns {String}
 */
const generateToken = (payload, secret, expiresIn) => {
  // generate token
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * @method verifyToken
 * @param {String} token
 * @param {String} secret
 * @returns {Object}
 */
const verifyToken = (token, secret) => {
  // verify token
  return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
