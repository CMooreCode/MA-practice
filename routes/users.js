var express = require('express');
var router = express.Router();
var sql = require('mysql');

var connection = sql.createConnection({
    host    : '172.22.0.2',
    user    : 'root',
    password: 'testpassword',
    database: 'madb'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  let rows = '';
  //connection.query('SELECT username FROM users' , (error, results) => {
  var query = connection.query('SELECT username FROM users');
  query
    .on('result', function(row) {
      console.log(row);
      rows += row.username + '\n';
    })
    .on('end', function() {
      console.log(rows);
      res.send(rows);
      res.end();
    });
  //console.log(results[0]);
  //rows = results;
  //});
  //console.log('rows:');
  //console.log(rows);
  //res.send(rows);
  //res.end()
});

module.exports = router;
