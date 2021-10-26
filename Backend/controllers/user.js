
const bcrypt = require('bcrypt'); // hasher le mot de passe
const jwt = require('jsonwebtoken'); //Permet d'attribuer un token à un utilisateur au moment ou il se connecte
const connection = require('../models/connection');
const mysql = require('mysql');
const fs =require('fs');
dotenv = require('dotenv').config();

//@todo route update user


exports.getOneUser = (req, res, next) => { //jwt recup id a partir du token, ligne 11         const token = req.headers.authorization.split(' ')[1];

    const userToken = req.headers.authorization;
    const userInfo = jwt.verify(userToken, process.env.TOKEN);
    const userId = userInfo.userId

    console.log(userInfo, userId);
    let sqlGetUser;

    sqlGetUser = "SELECT *  FROM user where user.id = ?";
    connection.query(sqlGetUser,[userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "User non trouvé !" });
        }
        res.status(200).json(result[0]);
        // console.log(res.status(200).json(result[0]));
    });
}

exports.getAllUsers = (req, res, next) => {
    const userID = req.body.userId;

    let sqlGetUsers;

    sqlGetUsers = `SELECT *  FROM user`;
    connection.query(sqlGetUsers, [userID], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun user trouvé!" });
        }
        res.status(200).json(result);
    });
}


//Sauvegarde un nouvel utilisateur et crypte son mot de passe avec bcrypt
exports.signup = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    let pseudo = req.body.pseudo;
    bcrypt.hash(password, 10)  //on hash le passeword avec un salt de 10 (nombre de fois ou le mdp sera hasher)
        .then(hash => { //On recupére le mdp hasher qui va etre enregistrer en tant que nouvel utilisateur dans MongoDB
            let sql = "INSERT INTO user (id,pseudo,email,password,avatar,date)" +
                      " VALUES (NULL, ?, ?, ?, NULL, CURRENT_TIMESTAMP())";
            let values = [ pseudo,email, hash ];
            connection.query(sql,values, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);//@todo errerur doublon email code erreur
                };
                res.status(201).json({ message: "Utilisateur crée !" });
            });
        })
        .catch(e => res.status(500).json(e));
};



exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const sqlFindUser = "SELECT id, password, isAdmin FROM user WHERE email = ?";

    connection.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid && req.user && req.user ) {   //@todo verifier si le code isAdmin fonctionne?
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
                res.status(200).json({
                    isAdmin: result[0].isAdmin,
                    userId: result[0].id,
                    token: jwt.sign(
                        {
                            userId: result[0].id,
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

    const userId = req.body.id;
    const sqlDeleteUser = "DELETE FROM `user` WHERE id=?";

    console.log(userId);
    connection.query(sqlDeleteUser, [userId], function (error) {
        if (error) {
            res.status(500).json("error");
            console.log('erreur')
        } else {
            // utilisateur supprimé dans la BDD
            res.status(201).json({ message: 'Utilisateur supprimé' });
            console.log('supprimé')

        }
    });

}


    // const password = req.body.password;
    // const userID = res.locals.userID;
//     let password = '$2b$10$4xflK767DkztLaQ3bGLb/OTyppSCJJmM/VFcz2/cWoeH0/eJiXaRS';
//     let id = 18;
//     let sqlFindUser = "SELECT password FROM User WHERE id = ?"; // ajouter avatar quand les routes seront prétes
//
//         // const filename = result[0].avatar.split("../gif")[1];
//         // if (filename !== "avatarDefault.jpg") {
//         //     fs.unlink(`images/${filename}`, (e) => { // On supprime le fichier image en amont
//         //         if (e) {
//         //             console.log(e);
//         //         }
//         //     })
//         // }
//
//         bcrypt.compare(password,result[0].password)
//             .then(valid => {
//                 if (!valid) {
//                     return res.status(401).json({ error: "Mot de passe incorrect !" });
//                 }
//                 let sqlDeleteUser = "DELETE FROM User WHERE id = ?";
//                 connection.query(sqlFindUser, [id], function (err, result) {
//                     if (err) {
//                         return res.status(500).json(err.message);
//                     };
//                     if (result.affectedRows == 0) {
//                         return res.status(400).json({ message: "Suppression échouée" });
//                     }
//                     res.status(200).json({ message: "Utilisateur supprimé !" });
//                 });
//             })
//             .catch(e => res.status(500).json(e));
//     });
// }

// @todo route logout ? on supp le token? voir jsonwebtoken si solution ou supp avec session storage cote front ?

// @todo compte admin ? isAdmin phpmyadmin, supp compte utilisateur a preparer coter back
