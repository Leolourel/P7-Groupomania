const express = require("express");
const router = express.Router();
//Récupération des controllers commentaires
const commentCtrl = require("../controllers/comment");

// route get qui permet de récupérer tous les commentaires
router.get("/", commentCtrl.getAllComment);
// route post qui permet la création d'un commentaire
router.post("/create", commentCtrl.createComment);
// route delete qui permet la suppression d'un commentaire
router.delete("/delete", commentCtrl.deleteComment);

//On exporte le module
module.exports = router;
