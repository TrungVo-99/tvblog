const { Router } = require("express");

const router = Router();
const clientController = require("../controllers/client.controller");
router.get("/get-navbar", clientController.getMenuData);
router.get("/", clientController.index);
router.get("/view-post/:postId", clientController.viewPost);

module.exports = router;
