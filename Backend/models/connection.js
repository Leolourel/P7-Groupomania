// package sql qui permet la connection à la bd sql groupomania
const mysql = require('mysql');
// Dotenv masque les informations de connection à la base de données à l'aide de variables d'environnement -> fichier .env
dotenv = require('dotenv').config();

// Création de la constante connection qui défini les variables de connection à la base de donnée sql groupomania
const connection = mysql.createConnection({
    // Variable d'identifiant pour la connection à la bd sql groupomania, les données sont masqué avec l'aide de dotenv, elles sont accessible dans le fichier.env
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database:  process.env.DB_DATABASE
});

// connection à la bd sql groupomania
connection.connect(function(err) {
    if (err) {
        // si il y'a une erreur lors de la connection on renvoi l'erreur
        console.error('error connecting: ' + err.stack);
        return;
    }
    //Sinon on confirme que l'on est bien connecté à la bd
    console.log('connecté à la base de données sql groupomania sur phpmyadmin');
});

//On export le module
module.exports = connection;
