// Permet l'envoi des données à la bd sql groupomania
const connection = require('../models/connection');
// package sql qui permet la connection à la bd sql groupomania
const mysql = require('mysql');


// route pour acceder à tous les gifs
exports.getAllGif = (req, res, next) => {

    // Jointure SQL entre la table gif user et comment afin que l'objet gif recupere les infos du user (author) et des commentaires associé au gif, les gifs sont renvoyé dans l'ordre decroisant
    const sqlFeed = "SELECT " +
        "g.id gif_id, g.title, g.url, DATE_FORMAT(g.date, \"%d/%m/%Y\") gif_date," +
        "gu.pseudo gif_user_pseudo, gu.avatar gif_user_avatar, gu.id gif_user_id," +
        "c.id comment_id, c.content comment_content, c.date comment_date, c.gif_id comment_gif_id," +
        "cu.pseudo comment_user_pseudo, cu.id comment_user_id, cu.avatar comment_user_avatar " +
        "FROM gif g " +
        "LEFT JOIN user gu ON g.user_id = gu.id " +
        "LEFT JOIN comment c ON g.id = c.gif_id " +
        "LEFT JOIN user cu ON c.user_id = cu.id " +
        "ORDER BY g.date DESC" ;

    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlFeed, function (err, result) {
        if (err) {
            // si il y'a une erreur on renvoi l'erreur
            return res.status(500).json(err.message);
        };
        // si il y'a aucun gif dans la table gif on renvoi un message
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        // On renvoi un tableau de tous les gifs
        const gifs = [];
        // Pour chaque gif
        result.forEach(row =>{
            // on recupere le commentaire avec l'user qui la créer
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
            // on cherche si on a deja le gif
            let gifExist = false;
            // Pour chaque gif existant on rajoute un commentaire
            for(let i = 0; i < gifs.length; i++){
                if (gifs[i].id === row.gif_id) {
                    // on ajoute le commentaire
                    gifExist = true;
                    gifs[i].comments.push(comment);

                }
            }
            if(!gifExist) {
                // On récupere le gif avec l'user qui l'a créer et ses commentaires
                let gif = {
                    id : row.gif_id,
                    title: row.title,
                    url: row.url,
                    date: row.gif_date,
                    author : {
                        pseudo : row.gif_user_pseudo,
                        avatar: row.gif_user_avatar,
                        id: row.gif_user_id
                    },
                    comments : [comment]
                }
                //On renvoi le gif dans le tableau
                gifs.push(gif);
            }
        })
        // Renvoi du tableau de gifs au front
        res.status(200).json(gifs);
    });
}



// route créer un gif
exports.createOneGif = (req, res, next) => {

    // On récupére l'user id dans la requete
    const userId = req.body.user_id;
    // On récupére le titre du gif dans la requete
    const title = req.body.title;
    // On récupére l'url du gif dans la requete
    const gifUrl = req.body.url;

    // envoi des valeurs à inserer dans la table gif pour la création du gif en sql
    let sqlCreateGif = "INSERT INTO gif (id,user_id,title,url,date)" +
        "VALUES (NULL, ?, ?, ?,CURRENT_TIMESTAMP())";
    //Tableau des valeurs recuperer dans la requete (user id, title, url)
    let values = [userId, title, gifUrl];

    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlCreateGif, values, function (err, result) {
        if (err) {
            // si il y'a une erreur lors de la création du gif on renvoi l'erreur
            return res.status(500).json(err.message);
            console.log("erreur dans la création du gif")
        };
        // si le gif est bien créer dans la bd on renvoi un message de confirmation
        res.status(201).json({ message: "Gif crée !" });
        console.log("gifcrée");
    });
};



// supprimer un gif
exports.deleteGif = (req, res, next) => {

    //On récupére l'id du gif dans la requete
    const gifId = req.body.id;
    //requete sql pour supprimer le gif correspondant à l'id dans la bd groupomania
    const sqlDeleteGif = "DELETE FROM `gif` WHERE id=?";

    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlDeleteGif, [gifId], function (error) {
        if (error) {
            // si il y'a une erreur lors de la création du commentaire on renvoi l'erreur
            res.status(500).json("error");
            console.log('erreur')
        } else {
            // si le gif est bien supprimer dans la bd on renvoi un message de confirmation
            res.status(201).json({ message: 'Gif supprimé' });
            console.log('gif supprimé')
        }
    });

}

