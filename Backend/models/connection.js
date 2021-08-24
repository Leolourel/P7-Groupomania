const mysql = require('mysql');
// Dotenv masque les informations de connexion à la base de données à l'aide de variables d'environnement -> fichier .env
dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database:  process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connecté à la base de données sql sur phpmyadmin');
});


module.exports = connection;
