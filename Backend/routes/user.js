const express = require('express');
const router = express.Router();
//Récupération des controllers user
const userCtrl = require('../controllers/user');

//Route post qui permet l'inscription d'un user
router.post('/signup', userCtrl.signup);
//Route post qui permet la connection d'un user
router.post('/login', userCtrl.login);
//Route delete qui permet la suppression d'un user
router.delete('/delete', userCtrl.deleteAccount);
//Route get qui permet de récupérer les infos d'un user
router.get('/infos', userCtrl.getOneUser);

//On exporte le module
module.exports = router;
