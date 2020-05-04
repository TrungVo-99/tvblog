const { Router } = require("express");
const router = Router();
const upload = require("../config/upload");

const adminController = require("../controllers/admin.controller");

router.get("/", adminController.index);
router.get("/menu", adminController.menu);

// category setting
router.post("/menu/add/category", adminController.postCreateCategory);
router.post("/menu/delete/category", adminController.postDeleteCategory);
router.post("/menu/update/category", adminController.postUpdateCategory);

// topic
router.post("/menu/add/topic", adminController.postCreateTopic);
router.post("/menu/update/topic", adminController.postUpdateTopic);

router.get("/post-management", adminController.postManagement);
router.get("/post-management/view/:postId", adminController.postView);
router.get("/post-management/edit/:postId", adminController.postEdit);
router.post("/post-management/edit/:postId", adminController.postUpdate);
router.post("/post-management/delete/:postId", adminController.postDelete);

router.get("/add-post", adminController.addPost);
router.post("/add-post", adminController.postAdded);

// Froala editor
router.post("/upload_image", adminController.uploadImage);
router.post("/delete_image", adminController.deleteImage);
router.get("/load_images", adminController.loadImages);

//

router.post("/getData", adminController.getDataDynamic);

// decentralization
router.get("/decentralization", adminController.decentralization);
router.post("/decentralization/:userId", adminController.postDecentralization);

module.exports = router;
