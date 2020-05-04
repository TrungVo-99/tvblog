const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
const postsModel = require("../models/posts.model");
const topicModel = require("../models/topic.model");

const FroalaEditor = require("wysiwyg-editor-node-sdk/lib/froalaEditor");
const moment = require("moment");

module.exports.getDataDynamic = (req, res) => {
  // console.log(req.body);
  categoryModel
    .findOne({ name: req.body.name })
    .populate("children", "name")
    .then((docs) => {
      // console.log(docs);
      res.send(docs);
    });
};

module.exports.index = (req, res) => {
  res.render("masterAdmin", {
    page: "index",
  });
};

module.exports.menu = (req, res) => {
  categoryModel
    .find()
    .populate("children", "name _id")
    // .select("name")
    .then((docs) => {
      // console.log(docs);
      res.render("masterAdmin", {
        page: "menu",
        data: docs,
        errMsg: req.flash("error"),
        successMsg: req.flash("success"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.postCreateCategory = (req, res) => {
  categoryModel
    .findOne({ name: req.body.nameCategory })
    .then((docs) => {
      if (docs) {
        req.flash("error", "Category is exist! pls try again");
        res.redirect("/admin/menu");
      } else {
        let newCategory = new categoryModel({
          name: req.body.nameCategory,
        });
        newCategory.save();
        req.flash("success", "Create new Category done!");
        res.redirect("/admin/menu");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports.postDeleteCategory = (req, res) => {
  // console.log(req.body);
  categoryModel
    .findByIdAndRemove(req.body.selectCategoryId)
    .then(() => {
      res.redirect("/admin/menu");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postUpdateCategory = (req, res) => {
  // console.log(req.body);
  categoryModel
    .findByIdAndUpdate(req.body.selectCategoryId, { name: req.body.nameUpdate })
    .then((docs) => {
      if (docs) {
        res.redirect("/admin/menu");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// topic
module.exports.postCreateTopic = (req, res) => {
  // console.log(req.body);
  topicModel
    .findOne({ name: req.body.nameTopic })
    .then((docs) => {
      if (docs) {
        req.flash("err", "Topic is exist! pls try again");
        res.redirect("/admin/menu");
      } else {
        let newTopic = new topicModel({
          name: req.body.topicName,
        });
        newTopic.save().then((data) => {
          // console.log(data);
          categoryModel
            .findByIdAndUpdate(req.body.selectCategoryId, {
              $push: { children: data._id },
            })
            .then(() => {
              req.flash("success", "Create new Topic success!");
              res.redirect("/admin/menu");
            });
        });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.postUpdateTopic = (req, res) => {
  // console.log(req.body);
  if (req.body.deleteTopic) {
    topicModel.findByIdAndRemove(req.body.selectTopicId).then(() => {
      req.flash("success", `Delete Topic: ${req.body.nameTopic} successfully`);
      res.redirect("/admin/menu");
    });
  } else {
    topicModel
      .findByIdAndUpdate(req.body.selectTopicId, { name: req.body.nameTopic })
      .then((docs) => {
        // console.log("in docs", docs);
        req.flash(
          "success",
          `Create Topic: ${req.body.nameTopic} successfully`
        );
        res.redirect("/admin/menu");
      });
  }
};

module.exports.addPost = (req, res) => {
  categoryModel
    .find()
    .populate("children", "name _id")
    .then((docs) => {
      if (docs) {
        res.render("masterAdmin", {
          page: "add-post",
          data: docs,
        });
      }
    })
    .catch((err) => Console.log(err));
};

module.exports.postAdded = (req, res) => {
  // console.log("hello post added");
  let onNewPost = false;
  // console.log(req.body.newPost);
  if (req.body.newPost != undefined) {
    onNewPost = true;
  }

  let newPosts = new postsModel({
    title: req.body.title,
    dateUpload: moment().format("MMMM Do YYYY, h:mm:ss a"),
    description: req.body.description,
    content: req.body.content,
    newPosts: onNewPost,
  });

  newPosts
    .save()
    .then((docs) => {
      // console.log(docs);
      if (docs) {
        topicModel.findByIdAndUpdate(req.body.selectTopicId, {
          $push: { posts: newPosts._d },
        });
      }
    })
    .then(() => {
      res.redirect("/admin/post-management");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.uploadImage = (req, res) => {
  // Store image.
  FroalaEditor.Image.upload(req, "/public/uploads/", function (err, data) {
    // Return data.
    if (err) {
      return res.send(JSON.stringify(err));
    }

    res.send(data);
  });
};

module.exports.deleteImage = (req, res) => {
  // console.log("delete");
  // Do delete.
  FroalaEditor.Image.delete(req.body.src, function (err) {
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    return res.end();
  });
};

module.exports.loadImages = (req, res) => {
  FroalaEditor.Image.list("/public/uploads/", function (err, data) {
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.send(data);
  });
};

// post management
module.exports.postManagement = (req, res) => {
  postsModel.find().then((docs) => {
    if (docs) {
      // console.log(req.session.flash);
      res.render("masterAdmin", {
        successMsg: req.flash("success"),
        errMsg: req.flash("err"),
        page: "post-management",
        data: docs,
      });
    } else {
      req.flash("err", "you dont have any posts, create one now!");
      res.render("masterAdmin", {
        page: "post-management",
        errMsg: req.flash("err"),
        // successMsg: req.flash("success")
      });
    }
  });
};

module.exports.postView = (req, res) => {
  // console.log(req.params.postId);
  postsModel
    .findById(req.params.postId)
    .then((docs) => {
      res.render("masterAdmin", {
        page: "post",
        data: docs,
        state: "view",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postDelete = (req, res) => {
  // console.log(req.params.postId);
  postsModel
    .findByIdAndRemove(req.params.postId)
    .then(() => {
      req.flash("success", "Delete completed");
      res.redirect("/admin/post-management");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postEdit = (req, res) => {
  postsModel
    .findById(req.params.postId)
    .then((docs) => {
      res.render("masterAdmin", {
        page: "post",
        data: docs,
        state: "edit || delete",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postUpdate = (req, res) => {
  postsModel
    .findByIdAndUpdate(req.params.postId, {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      dateUpload: moment().format("MMMM Do YYYY, h:mm:ss a"),
    })
    .then(() => {
      req.flash("success", "Update your post successfully");
      res.redirect("/admin/post-management");
    })
    .catch((err) => {
      console.log(err);
    });
};

// decentralization
module.exports.decentralization = (req, res) => {
  userModel
    .find({})
    .select("username _id role")
    .then((docs) => {
      res.render("masterAdmin", {
        page: "decentralization",
        data: docs,
      });
    });

  // res.render("masterAdmin", {
  //   page: "decentralization"
  // });
};

module.exports.postDecentralization = (req, res) => {
  userModel
    .findById(req.params.userId)
    .then((docs) => {
      if (docs.role == "admin") {
        docs.role = "user";
        docs.save().then(() => {
          res.redirect("/admin/decentralization");
        });
      } else {
        docs.role = "admin";
        docs.save().then(() => {
          res.redirect("/admin/decentralization");
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};
