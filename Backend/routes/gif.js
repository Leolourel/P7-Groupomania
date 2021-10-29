const express =     require('express');
const router =      express.Router();
//Récupération des controllers gif
const gifsCtrl =  require('../controllers/gif');

//Route get qui permet de récupérer tous les gifs
router.get('/',  gifsCtrl.getAllGif);
//Route post qui permet de créer un gif
router.post('/create',  gifsCtrl.createOneGif);
//Route delete qui permet de supprimer un gif
router.delete('/delete', gifsCtrl.deleteGif);

// On exporte le module
module.exports = router;
