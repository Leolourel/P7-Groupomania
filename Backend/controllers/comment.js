// Permet l'envoi des données à la bd sql groupomania
const connection = require('../models/connection');
// package sql qui permet la connection à la bd sql groupomania
const mysql = require('mysql');

//Route création d'un commentaire
exports.createComment = (req, res, next) => {
    // récupération de l'id du gif dans la requete
    const postID = req.body.gif_id;
    // récupération de l'id du user dans la requete
    const userID = req.body.user_id;
    // récupération du contenu du commentaire dans la requete
    const content = req.body.content;
    console.log(req.body)

    // envoi des valeurs a inserer dans la table comment en sql
    let sqlCreateComment = "INSERT INTO comment (gif_id, user_id, content)" +
        "VALUES (?, ?, ?)";
    // tableau des 3 valeurs requise pour l'envoi à la bd groupomania
    let values = [postID, userID, content];
    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlCreateComment, values, function (err, result) {
        if (err) {
            // si il y'a une erreur lors de la création du commentaire on renvoi l'erreur
            return res.status(500).json(err.message);

        };
        // si le commentaire est bien créer dans la bd on renvoi un message de confirmation
        res.status(201).json({ message: "Commentaire crée !" });
        console.log('commentaire crée');
    });
}

// route pour récuperer tous les commentaires
exports.getAllComment = (req, res, next) => {
    // jointure sql qui permet de lié la table comment à la table user afin de recuperer les informations du user pour chaques commentaires
    const sqlFeed = "SELECT c.id, c.gif_id, c.content, c.user_id, c.date, u.pseudo, u.avatar FROM comment c LEFT JOIN user u ON c.user_id = u.id";
    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlFeed, function (err, result) {
        if (err) {
            // si il y'a une erreur on renvoi l'erreur
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            // si il y'a aucun commentaire dans la table comment on renvoi un message pour le faire savoir
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        // sinon on renvoi un tableau de tous les commentaire
        res.status(200).json(result);
    });
}



// route pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    const commentId = req.body.id;
    const sqlDeleteComment = "DELETE FROM comment WHERE id=?";

    connection.query(sqlDeleteComment, [commentId], function (error) {
        if (error) {
            res.status(500).json("error");
            console.log('erreur')
        } else {
            // Commentaire supprimé dans la BDD
            res.status(201).json({ message: 'Commentaire supprimé' });
            console.log('Commentaire supprimé')

        }
    });

}
