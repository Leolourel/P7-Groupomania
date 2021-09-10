const express =     require('express');
const router =      express.Router();
const gifsCtrl =  require('../controllers/gif');
const auth =        require('../middleware/auth');
const multer =      require('../middleware/multer-config');


// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images

//@todo rajouter le middlewar auth au routes une fois les test terminées

router.get('/',  gifsCtrl.getAllGif);
router.post('/', multer, gifsCtrl.createOneGif);
router.get('/:id', gifsCtrl.getOneGif);
router.delete('/:id', gifsCtrl.deleteOneGif);
// router.post('/:id/like', auth, gifsCtrl.rateOneGif);

module.exports = router;
