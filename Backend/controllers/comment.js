// @todo route update
const connection = require('../models/connection');
const mysql = require('mysql');

exports.createComment = (req, res, next) => {
    const postID = req.gif_id;
    const userID = req.user_id;
    const body = req.content;

    let sqlCreateComment;
    let values;

    sqlCreateComment = "INSERT INTO comment VALUES (NULL, ?, ?, CURRENT_TIMESTAMP(), ?)";
    values = [userID, postID, body];
    connection.query(sqlCreateComment, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
            console.log(postID)
            console.log(userID)
            console.log(body)
        };
        res.status(201).json({ message: "Commentaire crée !" });
    });
}


exports.getAllComment = (req, res, next) => {
    const userID = res.locals.userID;
    const sqlFeed = "SELECT c.id, c.gif_id, c.content, c.user_id, c.date, u.pseudo, u.avatar FROM comment c LEFT JOIN user u ON c.user_id = u.id";
    connection.query(sqlFeed, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        res.status(200).json(result);
    });
}




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
