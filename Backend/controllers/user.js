const bcrypt = require('bcrypt'); // hasher le mot de passe
const jwt = require('jsonwebtoken'); //Permet d'attribuer un token à un utilisateur au moment ou il se connecte
const connection = require('../models/connection');
const mysql = require('mysql');
const fs =require('fs');
dotenv = require('dotenv').config();

//@todo route update user

// //Hashage de l'adresse mail qui va servir au route signup et login
// function hashEmail(sentence) {
//     if (typeof sentence === "string") {
//         let headMail = sentence.slice(0,1);
//         let bodyMail = sentence.slice(1, sentence.length-4);
//         let bottomMail = sentence.slice(sentence.length-4, sentence.length);
//         let final = [];
//         var masked = bodyMail.split('');
//         var maskedMail = [];
//         for(let i in masked) {
//             masked[i] = '*';
//             maskedMail += masked[i];
//         }
//         final += headMail + maskedMail + bottomMail
//         return final;
//     }
//     console.log(sentence + " is not a mail");
//     return false
// }


//Sauvegarde un nouvel utilisateur et crypte son mot de passe avec bcrypt
exports.signup = (req, res, next) => {
    // connection.query('SELECT * FROM user', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results);
    // });
    // let email = req.body.email;
    // let password = req.body.password;
    // let pseudo = req.body.username;
    let email = "leotesttest@gmail.com";
    let password = "leolourel";
    let pseudo = "leolourel"
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

    // const email = req.body.email;
    // const password = req.body.password;
    const email = "leotesttest@gmail.com";
    const password = "leolourel";

    const sqlFindUser = "SELECT password FROM user WHERE email = ?";

    connection.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
                res.status(200).json({
                    token: jwt.sign(
                        { userId: result[0].id },
                                process.env.TOKEN, //Clé d'encodage du token
                        { expiresIn: '24h' }, //Le token expire au bout de 24h, une nouvelle connexion sera demandée
                                console.log("utilisateur connecté ")
                    )
                });
            })
            .catch(e => res.status(500).json(e));
    });
}


// Route delete user
exports.delete = (req, res, next) => {

    // const password = req.body.password;
    // const userID = res.locals.userID;
    let password = 'leolourel';
    let id = '8';
    let sqlFindUser = "SELECT password FROM User WHERE id = ?"; // ajouter avatar quand les routes seront prétes
    connection.query(sqlFindUser, [id], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }

        // const filename = result[0].avatar.split("../gif")[1];
        // if (filename !== "avatarDefault.jpg") {
        //     fs.unlink(`images/${filename}`, (e) => { // On supprime le fichier image en amont
        //         if (e) {
        //             console.log(e);
        //         }
        //     })
        // }

        bcrypt.compare(password,result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                let sqlDeleteUser = "DELETE FROM User WHERE id = ?";
                connection.query(sqlDeleteUser, [id], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    };
                    if (result.affectedRows == 0) {
                        return res.status(400).json({ message: "Suppression échouée" });
                    }
                    res.status(200).json({ message: "Utilisateur supprimé !" });
                });
            })
            .catch(e => res.status(500).json(e));
    });
}

// @todo route logout ? on supp le token? voir jsonwebtoken si solution ou supp avec session storage cote front ?

// @todo compte admin ? isAdmin phpmyadmin, supp compte utilisateur a preparer coter back
