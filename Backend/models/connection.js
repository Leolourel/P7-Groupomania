const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'leolourel',
    password : '',
    database: 'groupomania'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connecté à la base de données sql sur phpmyadmin');
});


module.exports = connection;
