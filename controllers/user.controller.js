const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.login = (req, res) => {
  //   console.log(req.csrfToken());
  res.render("masterUser", {
    page: "login",
    csrfToken: req.csrfToken(),
    errMsg: req.flash("err"),
  });
};

module.exports.postLogin = (req, res) => {
  // console.log(req.session);
  res.redirect("/");
};

module.exports.register = (req, res) => {
  // console.log(req.session, "error message");

  res.render("masterUser", {
    page: "register",
    csrfToken: req.csrfToken(),
    errMsg: req.flash("err"),
  });
};

module.exports.postRegister = (req, res) => {
  //   console.log(req.session.flash);
  //   const error = validationResult(req).array();
  //   if (error) {
  //     let errMsg = [];
  //     error.forEach(err => {
  //       errMsg.push(err.msg);
  //     });
  //     errMsg.concat(req.flash("err"));
  //     res.send(errMsg);
  //   }
  //   console.log(req.body);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
