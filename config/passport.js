const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel
    .findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      console.log(err);
    });
});

passport.use(
  "local-register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true //allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => {
      let errors = validationResult(req).array();
      //   console.log(errors, "error");
      if (errors.length > 0) {
        let errorMsg = [];
        errors.forEach(e => {
          //   console.log(e.msg, " abccc");
          errorMsg.push(e.msg);
        });
        return done(null, false, req.flash("err", errorMsg));
      }

      userModel
        .findOne({ name: username })
        .then(user => {
          if (user) {
            return done(null, false, req.flash("err", "Username had used!"));
          }
          let newUser = new userModel();
          newUser.username = username;
          newUser.name = req.body.name || "unknown";
          newUser.password = newUser.encryptPassword(password);

          newUser.save().then(() => {
            return done(
              null,
              newUser,
              req.flash("success", "Register successfull")
            );
          });
        })
        .catch(err => {
          console.log(err);
          return done(err);
        });
    }
  )
);

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, done) => {
      //   console.log(username, password);
      userModel
        .findOne({ username: username })
        .then(user => {
          //   console.log(user);
          if (!user) {
            return done(null, false, req.flash("err", "Username don`t exist!"));
          }
          if (user.validPassword(password, user.password)) {
            return done(null, user, req.flash("success", "login successfull"));
          } else {
            return done(
              null,
              false,
              req.flash("err", "Password does not match")
            );
          }
        })
        .catch(err => {
          console.log(err);
          return done(err);
        });
    }
  )
);
