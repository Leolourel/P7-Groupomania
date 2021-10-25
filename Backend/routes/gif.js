const express =     require('express');
const router =      express.Router();
const gifsCtrl =  require('../controllers/gif');
const auth =        require('../middleware/auth');
const multer =      require('../middleware/multer-config');


// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images

//@todo rajouter le middlewar auth au routes une fois les test terminées

router.get('/',  gifsCtrl.getAllGif);
router.post('/',  gifsCtrl.createOneGif);
router.get('/:id', gifsCtrl.getOneGif);
router.delete('/delete', gifsCtrl.deleteGif);

module.exports = router;
