// framework qui permet le developpement serveur sur nodejs
const express = require('express');
// Extraction de l'objet JSON des requetes POST
const bodyParser = require('body-parser');
//Accès au chemin de notre système de fichier
const path = require('path');
//Sécurise les requetes HTTP, les en-tétes, detournement de clics
const helmet = require('helmet');
//Désactive mise en cache du navigateur
const nocache = require('nocache');


//Déclaration des routes
//Import de la route dédiée aux sauces
const gifRoutes = require ('./routes/gif');
//Import de la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');
//Import de la route dédiée au commentaires
const commenRoutes = require('./routes/comment');

const app = express();


// Dotenv masque les informations de connexion à la base de données à l'aide de variables d'environnement -> fichier .env
//@todo appliquer une variable dotenv a la connexion BBD mysql
dotenv = require('dotenv').config();


//Middleware debloquant certains système de sécurité CORS, permet à nchaque utilisateur de faire des requetes depuis son navigateurs, permet au front de communiquer avec le back
app.use((req, res, next) => {
    // les ressources peuvent étre partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Indique les entétes qui seront utilisées après la vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Méthodes autorisées pour les requetes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Sécurise les requetes HTTP, les en-tétes, detournement de clics, mise en place du X-XXS-Protection ...
app.use(helmet());

//Désactive la mise en cache du navigateur
app.use(nocache());

//Transforme le corp de la requete en objet js
app.use(bodyParser.json());

//Permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes sauces
app.use('/api/gif', gifRoutes);

//Routes utilisateurs
app.use('/api/auth', userRoutes);

//Export app.js pour server.js
module.exports = app;
