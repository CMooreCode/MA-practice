var express = require('express');
var router = express.Router();
var path = require('path');
var sql = require('mysql');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../register.html'));
});

var connection = sql.createConnection({
    host    : 'host.docker.internal',
    user    : 'root',
    password: 'testpassword',
    database: 'madb'
});

function registration( username, password) {
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
}

/* registration POST request */
router.post('/', function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    var confirmPassword = request.body.confirmPassword;
        try {
            if (username && !(confirmPassword.localeCompare(password))) {
                connection.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, next) {
                    if (results.length > 0) {
                        response.send('Username is already taken');
                    } else {
                        registration(username, password);
                        console.log('Successful register');
                        response.redirect('/../');
                    }
                    response.end();
                });
            } else {
                response.send('Please enter Username and matching Passwords!');
                response.end();
            }
        } catch (err) {
            console.log('in the error');
            console.log(err);
            // do error checking
        }
});

module.exports = router;
