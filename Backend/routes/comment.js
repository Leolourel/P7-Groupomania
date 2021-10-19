const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth');

router.get("/", commentCtrl.getAllComment);
router.post("/", commentCtrl .createComment);

module.exports = router;
