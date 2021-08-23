const bcrypt = require('bcrypt'); // hasher le mot de passe
const jwt = require('jsonwebtoken'); //Permet d'attribuer un token à un utilisateur au moment ou il se connecte
const connection = require('../models/connection');
const mysql = require('mysql');
//@todo besoin de hasher l'email ?
//@todo route delete user ?  update user?

//Hashage de l'adresse mail qui va servir au route signup et login
function hashEmail(sentence) {
    if (typeof sentence === "string") {
        let headMail = sentence.slice(0,1);
        let bodyMail = sentence.slice(1, sentence.length-4);
        let bottomMail = sentence.slice(sentence.length-4, sentence.length);
        let final = [];
        var masked = bodyMail.split('');
        var maskedMail = [];
        for(let i in masked) {
            masked[i] = '*';
            maskedMail += masked[i];
        }
        final += headMail + maskedMail + bottomMail
        return final;
    }
    console.log(sentence + " is not a mail");
    return false
}


//Sauvegarde un nouvel utilisateur et crypte son mot de passe avec bcrypt
exports.signup = (req, res, next) => {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    let email = req.body.email;
    let password = req.body.password;
    let pseudo = req.body.username;
    bcrypt.hash(password, 10)  //on hash le passeword avec un salt de 10 (nombre de fois ou le mdp sera hasher)
        .then(hash => { //On recupére le mdp hasher qui va etre enregistrer en tant que nouvel utilisateur dans MongoDB
            let sql = 'INSERT INTO users VALUES(NULL, "pseudo", "email", NULL, CURRENT_TIMESTAMP())';
            // let values = [ email, hash, pseudo ];
            connection.query(sql, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                };
                res.status(201).json({ message: "Utilisateur crée !" });
            });
        })
        .catch(e => res.status(500).json(e));
};


// Le Middleware pour la connexion d'un utilisateur vérifie si l'utilisateur existe dans la base MongoDB lors du login
//si oui il vérifie son mot de passe, s'il est bon il renvoie un TOKEN contenant l'id de l'utilisateur, sinon il renvoie une erreur
exports.login = (req, res, next) => {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    // On doit trouver l'utilisateur dans la BDD qui correspond à l'adresse entrée par l'utilisateur
    User.findOne({ email: hashEmail(req.body.email) })  //todo verifier si besoin de hasher l'email avec patxi
        .then(user => {
            if (!user) {
                //Si l'adresse mail ne correspont pas on renvoi un erreur 401
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // On utilise bcrypt pour comparer les hashs et savoir si ils ont la même string d'origine
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) { //Si le mdp ne correspond pas on renvoi une erreur 401
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET', //Clé d'encodage du token
                            { expiresIn: '24h' } //Le token expire au bout de 24h, une nouvelle connexion sera demandée
                        ) // On encode le userID pour la création de nouveaux objets, et cela permet d'appliquer le bon userID
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
