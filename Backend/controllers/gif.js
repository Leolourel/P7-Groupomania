//todo lister les routes possibles
//todo route commentaire
const connection = require('../models/connection');
const mysql = require('mysql');
const fs =require('fs');

//acceder à toutes les sauces
// exports.getAllGif = (req, res, next) => {
//     //On utilise la méthode find pour obtenir l'array de toutes les sauces dans la base de données
//     Gif.find()
//         //Si ok on retourne un tableau de toutes les données, sinon on retourne un message d'erreur
//         .then((gif) => {res.status(200).json(gif);})
//         .catch((error) => {res.status(400).json({error});
//         });
// };

//créer une sauce
exports.createOneGif = (req, res, next) => {
    // const userID = res.locals.userID;
    // const legend = req.body.legend;
    // const gifUrl = `${req.protocol}://${req.get("host")}/gif/${req.file.filename}`;
    let user_id = "9";
    let title = "testgif";
    let gifUrl = "hello.gif";

    console.log(user_id,title,gifUrl);

    let sqlCreateGif = "INSERT INTO gif (id,user_id,title,url,date)" +
        "VALUES (NULL, ?, ?, ?,CURRENT_TIMESTAMP())";
    let values = [user_id, title, gifUrl];
    connection.query(sqlCreateGif, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        res.status(201).json({ message: "Gif crée !" });
    });
};

//acceder à un gif //todo besoin d'acceder à un seul gif ?
// exports.getOneSauce = (req, res, next) => {
//     Gif.findOne({_id: req.params.id})
//         .then((gif) => { res.status(200).json(gif);})
//         .catch((error) => {res.status(404).json({error});
//         });
// };

//modifier une sauce
// exports.modifyOneGif = (req, res, _) => {
//     //On récupére le gif à modifier
//     const gifObject = req.file ? {
//         ...JSON.parse(req.body.gif),
//         gifUrl: `${req.protocol}://${req.get('host')}/gif/${req.file.filename}`
//     } : { ...req.body };
//     //Mise à jour des modification du gif
//     Gif.updateOne({ _id: req.params.id }, { ...gifObject, _id: req.params.id })
//         //Envoi d'une réponse au front avec un statut 200 et d'une erreur en cas de problème
//         .then(() => res.status(200).json({ message: 'gif modifiée.' }))
//         .catch(error => res.status(400).json({error}));
// };
//
// //supprimer un gif
// exports.deleteOneGif = (req, res, next) => {
//     //On récupere le gif
//     Gif.findOne({ _id: req.params.id })
//         .then(gif => {
//             //On supprime le gif et l'image de la base de données
//             const filename = gif.gifUrl.split('/gif/')[1];
//             fs.unlink(`gif/${filename}`, () => {
//                 Gif.deleteOne({ _id: req.params.id })
//                     //Envoi d'une réponse au front avec un statut 200 et d'une erreur en cas de problème
//                     .then(() => res.status(200).json({ message: 'Gif supprimé !'}))
//                     .catch(error => res.status(400).json({ error }));
//             });
//         })
//         .catch(error => res.status(500).json({ error }));
// };
//
//
// exports.rateOneGif = (req, res, next) => {
//     if (req.body.like === 1) { // si l'utilisateur aime le gif //
//         Gif.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } }) // on ajoute 1 like et on le push l'array usersLiked //
//             .then((gif) => res.status(200).json({ message: 'Un like de plus !' }))
//             .catch(error => res.status(400).json({ error }));
//     } else if (req.body.like === -1) { // sinon si il aime pas la sauce //
//         Gif.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) // on ajoute 1 dislike et on le push l'array usersDisliked //
//             .then((gif) => res.status(200).json({ message: 'Un dislike de plus !' }))
//             .catch(error => res.status(400).json({ error }));
//     } else { // si l'utilisateur enleve son vote
//         Gif.findOne({ _id: req.params.id })
//             .then(gif => {
//                 if (gif.usersLiked.includes(req.body.userId)) { // si l'array userLiked contient le id de like //
//                     Gif.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
//                         .then((gif) => { res.status(200).json({ message: 'Un like de moins !' }) })
//                         .catch(error => res.status(400).json({ error }))
//                 } else if (gif.usersDisliked.includes(req.body.userId)) { //// si l'array userDisliked contient le id de like //
//                     Gif.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })// $pull : ça vide l'array userDisliked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
//                         .then((gif) => { res.status(200).json({ message: 'Un dislike de moins !' }) })
//                         .catch(error => res.status(400).json({ error }))
//                 }
//             })
//             .catch(error => res.status(400).json({ error }));
//     }
// };
