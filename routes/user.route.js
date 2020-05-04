const { Router } = require("express");
const router = Router();
const { checkRegister } = require("../config/validate.form");
const passport = require("passport");

const userController = require("../controllers/user.controller");

router.get("/login", userController.login);
router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/user/login",
    failureFlash: true,
    successFlash: true,
    successRedirect: "/"
  }),
  userController.postLogin
);

router.get("/register", userController.register);
router.post(
  "/register",
  checkRegister,
  passport.authenticate("local-register", {
    successFlash: true,
    successRedirect: "/",
    failureRedirect: "/user/register",
    failureFlash: true
  }),
  userController.postRegister
);

router.get("/logout", userController.logout);

module.exports = router;
