const express =     require('express');
const router =      express.Router();
const gifsCtrl =  require('../controllers/gif');
const auth =        require('../middleware/auth');
const multer =      require('../middleware/multer-config');


// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images

//@todo rajouter le middlewar auth au routes une fois les test terminées

// router.get('/', auth, gifsCtrl.getAllGif);
router.post('/', multer, gifsCtrl.createOneGif);
// // router.get('/:id', auth, gifsCtrl.getOneGif);
// router.put('/:id',auth, multer, gifsCtrl.modifyOneGif);
// router.delete('/:id', auth, gifsCtrl.deleteOneGif);
// router.post('/:id/like', auth, gifsCtrl.rateOneGif);

module.exports = router;
