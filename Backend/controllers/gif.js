
const connection = require('../models/connection');
const mysql = require('mysql');
const fs =require('fs');
const jwt = require('jsonwebtoken');

//@todo getall gif et getOne gif route, type de jointure pour mes select : SELECT *  FROM gif g INNER JOIN user u ON u.id = g.user_id



// acceder à tous les gifs
exports.getAllGif = (req, res, next) => {
    const userID = res.locals.userID;
    const sqlFeed = "SELECT g.id gif_id, g.title, g.url, g.date gif_date, gu.pseudo gif_user_pseudo, gu.avatar gif_user_avatar, gu.id gif_user_id, c.id comment_id, c.content comment_content, c.date comment_date, c.gif_id comment_gif_id, cu.pseudo comment_user_pseudo, cu.id comment_user_id, cu.avatar comment_user_avatar FROM gif g LEFT JOIN user gu ON g.user_id = gu.id LEFT JOIN comment c ON g.id = c.gif_id LEFT JOIN user cu ON c.user_id = cu.id" ;
    connection.query(sqlFeed, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        const gifs = {};
        result.forEach(row =>{
            // console.log(row)
            const gif = {
                id : row.gif_id,
                title: row.title,
                url: row.url,
                date: row.gif_date,
                author : {
                    pseudo : row.gif_user_pseudo,
                    avatar: row.gif_user_avatar,
                    id: row.gif_user_id
                },
                comments : {}
            }
            const comment = {
                id : row.comment_id,
                gif_id: row.comment_gif_id,
                content : row.comment_content,
                date : row.comment_date,
                author : {
                    pseudo : row.comment_user_pseudo,
                    avatar: row.comment_user_avatar,
                    id: row.comment_user_id
                }
            }
            // console.log(gif,comment)
            if (gifs[gif.id] === undefined) {
                // gif n'est pas dans la liste on le rajoute
                gif.comments = comment
                gifs[gif.id] = gif
            } else {
                // le gif est déja dans la liste on rajoute seulement son commentaire
                gifs[gif.id].comments = comment
            }
        })
        // console.log(gifs[11].comments)
        res.status(200).json(gifs);
    });
}


// acceder à un seul gif
exports.getOneGif = (req, res, next) => {
    const postID = req.params.id;
    let sqlGetPost;

    sqlGetPost = `SELECT *  FROM gif where gif.id = ?`;
    connection.query(sqlGetPost,[postID], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        res.status(200).json(result);
    });
}



//créer un gif
exports.createOneGif = (req, res, next) => {

    const userId = req.body.user_id;
    const title = req.body.title;
    const gifUrl = req.body.url;

    console.log(userId,title,gifUrl);

    let sqlCreateGif = "INSERT INTO gif (id,user_id,title,url,date)" +
        "VALUES (NULL, ?, ?, ?,CURRENT_TIMESTAMP())";
    let values = [userId, title, gifUrl];
    connection.query(sqlCreateGif, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        res.status(201).json({ message: "Gif crée !" });
        console.log("gifcrée");
    });
};



// supprimer un gif
exports.deleteGif = (req, res, next) => {

    const gifId = req.body.id;
    const sqlDeleteGif = "DELETE FROM `gif` WHERE id=?";

    console.log(gifId);
    connection.query(sqlDeleteGif, [gifId], function (error) {
        if (error) {
            res.status(500).json("error");
            console.log('erreur')
        } else {
            // Gif supprimé dans la BDD
            res.status(201).json({ message: 'Gif supprimé' });
            console.log('gif supprimé')

        }
    });

}

