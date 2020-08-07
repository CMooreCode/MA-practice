var express = require('express');
var router = express.Router();
var sql = require('mysql');

var connection = sql.createConnection({
    host    : '172.22.0.2',
    user    : 'root',
    password: 'testpassword',
    database: 'madb'
});

/* authentication POST request */
router.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
			console.log('results:');
			console.log(results);
			if (results.length > 0) {
                console.log('login success');
				response.redirect('/../users');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

module.exports = router;