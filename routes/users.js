var express = require('express');
var router = express.Router();
var sql = require('mysql');

var connection = sql.createConnection({
    host    : 'sql-server-db',
    user    : 'root',
    password: 'testpassword',
    database: 'madb'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  let rows = '';
  var query = connection.query('SELECT username FROM users');
  query
    .on('result', function(row) {
      rows += row.username + '\n';
    })
    .on('end', function() {
      res.send(rows);
      res.end();
    });
});

module.exports = router;
