const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
// const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/delete', userCtrl.delete);
router.get('/infos', userCtrl.getOneUser);
router.get('/users', userCtrl.getAllUsers);

module.exports = router;
