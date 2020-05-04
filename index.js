require("dotenv").config();

const express = require("express");
const app = express();

app.listen(process.env.PORT || 7000);

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const passport = require("passport");
// const multer = require('multer')

// connect mongdb

mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log("connect succeessfully"))
  .catch((err) => {
    console.log(err);
  });

//setting
app.set("view engine", "ejs");
app.set("./views", "views");

//
require("./config/passport");

//midleware using
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "trungvo",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 180 * 60 },
  })
);
app.use(flash());
app.use("/user", csrf({ cookie: true }));
app.use(passport.initialize());
app.use(passport.session());

// router
const clientRoute = require("./routes/client.route");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");

const midlewareRequireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      req.flash("err", "You are not that role ");
      res.redirect("/");
    }
  };
};

// app.use((req, res, next) => {
//   console.log("abc", req.isAuthenticated(), "user: ", req.user);

//   next();
// });

//route
app.use("/", clientRoute);
app.use("/admin", midlewareRequireRole("admin"), adminRoute);
app.use("/user", userRoute);
