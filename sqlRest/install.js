var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    user: 'nomad',
    password: 'nomad',
    server: 'localhost',
    database: 'Persons',
    options: {
      encrypt: true
    }
}

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});


CREATE TABLE details (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
gender VARCHAR(30) NOT NULL,
age INT(6) NOT NULL,
mobile VARCHAR(11) NOT NULL,
)
