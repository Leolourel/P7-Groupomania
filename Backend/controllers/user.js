//Hasher le mot de passe
const bcrypt = require('bcrypt');
//Permet d'attribuer un token à un utilisateur au moment ou il se connecte
const jwt = require('jsonwebtoken');
// Permet l'envoi des données à la bd sql groupomania
const connection = require('../models/connection');
//Permet la connection à la bd sql groupomania
const mysql = require('mysql');
const fs =require('fs');
//Dotenv masque les informations de connection à la base de données à l'aide de variables d'environnement -> fichier .env
dotenv = require('dotenv').config();


//Route pour récupérer les informations d'un user à partir de son id
exports.getOneUser = (req, res, next) => {
    //Recupération du token dans la requete
    const userToken = req.headers.authorization;
    //On decripte le token avec jwt pour récupérer les infos du user
    const userInfo = jwt.verify(userToken, process.env.TOKEN);
    //On récupere l'id du user
    const userId = userInfo.id

    console.log(userInfo, userId);
    // Requete sql pour selectionner l'user à partir de son id
    let sqlGetUser = "SELECT *  FROM user where user.id = ?";

    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlGetUser,[userId], function (err, result) {
        if (err) {
            //Si il y'a une erreur on renvoi un message d'erreur
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            //Si l'id ne correspond à aucun user ou que aucun user n'est enregistré dans la bd on renvoi un msg
            return res.status(400).json({ message: "User non trouvé !" });
        }
        //On renvoi l'user trouvé
        res.status(200).json(result[0]);
    });
}


//Route d'inscription
exports.signup = (req, res, next) => {

    //On récupére l'email dans la requete
    let email = req.body.email;
    //On récupére le mot de passe dans la requete
    let password = req.body.password;
    // On recupere le pseudo dans la requete
    let pseudo = req.body.pseudo;

    bcrypt.hash(password, 10)  //on hash le passeword avec un salt de 10 (nombre de fois ou le mdp sera hasher)
        .then(hash => { //On recupére le mdp hasher pour le transmettre à la requete sql
            // Envoi des valeurs à inserer dans la table user dans la bd groupomania
            let sql = "INSERT INTO user (id,pseudo,email,password,avatar,date)" +
                      " VALUES (NULL, ?, ?, ?, NULL, CURRENT_TIMESTAMP())";
            // Tableau des données recuperer dans la requete
            let values = [ pseudo,email, hash ];
            // méthode .query pour l'envoi des données à la bd
            connection.query(sql,values, function (err, result) {
                if (err) {
                    // Si il y'a une erreur on renvoi un message d'erreur
                    return res.status(500).json(err.message);
                };
                // Utilisateur créer
                res.status(201).json({ message: "Utilisateur crée !" });
            });
        })
        .catch(e => res.status(500).json(e));
};


//Route de connexion
exports.login = (req, res, next) => {

    // On récupére l'email envoyé² dans la requete
    const email = req.body.email;
    // On récupére le mot de passe envoyé dans la requete
    const password = req.body.password;
    //On vérifie que l'id de l'user correspond à son email en sql
    const sqlFindUser = "SELECT id, password, isAdmin FROM user WHERE email = ?";

    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            //Si il y'a une erreur on renvoi un message d'erreur
            return res.status(500).json(err.message);
        };
        //Si il y'a aucun user dans la bd ou si aucun id ne correspond à son email on renvoi un msg
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        //On compare le mot de passe avec le hash pour verifier si il est valide
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                //Si le mot de passe ne correspond pas
                if (!valid && req.user && req.user ) {
                    //On renvoi un message d'erreur
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                // Si true, on renvoie un statut 200 et un objet JSON avec les infos du user son id et un token
                res.status(200).json({
                    pseudo: result[0].pseudo,
                    email: result[0].email,
                    avatar: result[0].avatar,
                    isAdmin: result[0].isAdmin,
                    id: result[0].id,
                    token: jwt.sign(
                        {
                            id: result[0].id,
                        },
                                process.env.TOKEN, //Clé d'encodage du token
                        { expiresIn: '24h' }, //Le token expire au bout de 24h, une nouvelle connexion sera demandée
                                console.log("utilisateur connecté ", result[0])

                    )
                });
            })
            .catch(e => res.status(500).json(e));
    });
}


// Route delete user
exports.deleteAccount = (req, res, next) => {

    //On récupére l'id du user dans la requete
    const userId = req.body.id;

    //Requete sql pour supprimer l'user correspondant à l'id
    const sqlDeleteUser = "DELETE FROM `user` WHERE id=?";

    console.log(userId);
    // méthode .query pour l'envoi des données à la bd
    connection.query(sqlDeleteUser, [userId], function (error) {
        if (error) {
            //Si il y'a une erreur on renvoi un message d'erreur
            res.status(500).json("error");
            console.log('erreur')
        } else {
            // utilisateur supprimé dans la BDD
            res.status(201).json({ message: 'Utilisateur supprimé' });
            console.log('supprimé')

        }
    });

}

