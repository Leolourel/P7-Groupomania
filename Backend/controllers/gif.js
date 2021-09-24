
const connection = require('../models/connection');
const mysql = require('mysql');
const fs =require('fs');

//@todo getall gif et getOne gif route, type de jointure pour mes select : SELECT *  FROM gif g INNER JOIN user u ON u.id = g.user_id


//acceder à toutes les sauces
// exports.getAllGif = (req, res, next) => {
//     //On utilise la méthode find pour obtenir l'array de toutes les sauces dans la base de données
//     Gif.find()
//         //Si ok on retourne un tableau de toutes les données, sinon on retourne un message d'erreur
//         .then((gif) => {res.status(200).json(gif);})
//         .catch((error) => {res.status(400).json({error});
//         });
// };

//acceder à tous les gifs
exports.getAllGif = (req, res, next) => {
    // const userID = res.locals.userID;
    const userID = "9";
    let sqlGetPosts;
    sqlGetPosts = `SELECT *  FROM gif`;
    connection.query(sqlGetPosts, [userID], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        res.status(200).json(result);
    });
}


// acceder à un seul gif
exports.getOneGif = (req, res, next) => {
    const postID = req.params.id;
    // const postID = "4"

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



// supprimer un gif
exports.deleteOneGif = (req, res, next) => {
    // const gifId = req.params.id;
    // const userId = res.locals.userID;
    let gifId = "5";
    let userId = "9";
    let gifUrl = "hello.gif"; //@todo supp après test, doublon de code verifier

    let sqlSelectPost = "SELECT url FROM gif WHERE id = ?";
    connection.query(sqlSelectPost, [gifId], function (err, result) {
        if (result > 0) {
            // const filename = result[0].gifUrl.split("/gif/")[1];
            // fs.unlink(`gif/${filename}`
                fs.unlink(gifUrl, () => { // On supprime le fichier image en amont
                let sqlDeletePost = "DELETE FROM Post WHERE userID = ? AND postID = ?";
                connection.query(sqlDeletePost, [userId, gifId], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    };
                    res.status(200).json({ message: "Post supprimé !" });
                });
            })
        } else {
            let sqlDeletePost = "DELETE FROM gif WHERE user_id = ? AND id = ?";
            connection.query(sqlDeletePost, [userId, gifId], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                };
                res.status(200).json({ message: "Post supprimé !" });
            });
        }
        if (err) {
            return res.status(500).json(err.message);
        };


    });
}
//
// exports.rateOneGif = (req, res, next) => {
