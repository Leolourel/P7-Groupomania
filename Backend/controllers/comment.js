// @todo route update
const connection = require('../models/connection');
const mysql = require('mysql');

exports.createComment = (req, res, next) => {
    const postID = req.params.id;
    const userID = res.locals.userID;
    const body = req.body.body;

    let sqlCreateComment;
    let values;

    sqlCreateComment = "INSERT INTO comment VALUES (NULL, ?, ?, CURRENT_TIMESTAMP(), ?)";
    values = [userID, postID, body];
    connection.query(sqlCreateComment, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        res.status(201).json({ message: "Commentaire crée !" });
    });
}


exports.getAllComment = (req, res, next) => {
    const userID = res.locals.userID;
    // const userID = "42";
    const sqlFeed = "SELECT* FROM comment";
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
// exports.findAllComments = (req, res, next) => {

// };
//
//
// exports.deleteComment = (req, res, next) => {
//
// };
