const topicModel = require("../models/topic.model");
const categoryModel = require("../models/category.model");
const postsModel = require("../models/posts.model");

module.exports.getMenuData = (req, res) => {
  // if (req.isAuthenticated()) {
  //   console.log(req.isAuthenticated());
  //   categoryModel
  //     .find()
  //     .select("name _id")
  //     .populate("children", "name _id")
  //     .then(docs => {
  //       res.send({
  //         docs: docs,
  //         userInfo: req.user,
  //         logined: req.isAuthenticated()
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  categoryModel
    .find()
    .select("name _id")
    .populate("children", "name _id")
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => console.log(err));
};

module.exports.index = async (req, res) => {
  // console.log(req.query.q);
  let posts = await postsModel.find({}).sort({ dateUpload: -1 });
  // console.log(posts);
  postsModel
    .findOne({ newPosts: true })
    .then((docs) => {
      // console.log(docs);
      if (req.isAuthenticated()) {
        res.render("masterClient", {
          page: "index",
          newPost: docs,
          posts: posts,
          successMsg: req.flash("success"),
          errMsg: req.flash("err"),
          userInfo: req.user,
          logined: req.isAuthenticated(),
        });
      } else {
        res.render("masterClient", {
          page: "index",
          newPost: docs,
          posts: posts,
          successMsg: req.flash("success"),
          errMsg: req.flash("err"),
          logined: req.isAuthenticated(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.viewPost = (req, res) => {
  postsModel
    .findById(req.params.postId)
    .then((docs) => {
      res.render("masterClient", {
        page: "view-post",
        post: docs,
      });
    })
    .catch((err) => console.log(err));
};
