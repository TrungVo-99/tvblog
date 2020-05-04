const { check } = require("express-validator");

module.exports.checkRegister = [
  // check("name")
  //   .notEmpty()
  //   .withMessage(`Name is't empty !`),
  check("username")
    .notEmpty()
    .withMessage("Username must be required!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long")
];
