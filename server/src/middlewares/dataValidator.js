const { body, check, validationResult } = require("express-validator");

// specify validation rules for blog data
const blogDataValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title should be at least 5 and at most 50 characters"),
  body("content")
    .notEmpty()
    .withMessage("content is required")
    .isLength({ min: 10, max: 100 })
    .withMessage("content should be at least 10 and at most 100 characters"),
];

// specify validation rule for user data
const userDataValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password does not match");
    }

    return true;
  }),
];

// handler express validator error
const checkValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.errors[0].msg });
  }
  next();
};

module.exports = {
  blogDataValidationRules,
  userDataValidationRules,
  checkValidationError,
};
