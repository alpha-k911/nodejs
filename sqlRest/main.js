var express = require('express');
var app = express();

var mysql = require("mysql");
app.use(express.json());
//Database connection
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'nomad',
		password : 'nomad',
		database : 'Persons'
	});
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.locals.connection.connect();
	next();
});

// app.use('/api/v1/users', users);

app.get('/person', function(req, res, next) {
	res.locals.connection.query('SELECT * from details', function (error, results, fields) {
		if (error) throw error;
		// console.log(JSON.stringify({results}));
		res.send(JSON.stringify({results}));
	});
});

app.get('/person/:id/', function (req, res,next) {
    var stringRequest = 'select * from details where id = ' + req.params.id;
    res.locals.connection.query(stringRequest, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({results}));
	});
});

app.post('/person',(req,res,next)=>{
        console.log(req.body);
        var stringRequest = `insert into details (name,age,gender,mobile) values ("${req.body.name}","${req.body.age}","${req.body.gender}","${req.body.mobile}")`;
        console.log(stringRequest);
        console.log(req.body);
        res.locals.connection.query(stringRequest, function (error, results, fields) {
            if (error){ res.send("Provide all necessary parameters");}
            else{
                if(results.affectedRows == 0){
                    res.send("Error in INSERTION..... Provide all necessary inputs");
                }else{
                    res.send("Inserted Successfully");
                }
            }
    	});
});

app.put('/person/:id',(req,res,next)=>{
    var stringRequest = `update details set name="${req.body.name}",age="${req.body.age}",gender="${req.body.gender}",mobile="${req.body.mobile}" where id="${req.params.id}"`;
    console.log(stringRequest);
    console.log(req.body);
    res.locals.connection.query(stringRequest, function (error, results, fields) {
        if (error){ res.send("Provide all necessary parameters");}
        else{
            if(results.affectedRows == 0){
                res.send("No PERSON with specific ID");
            }else{
                res.send("Updated Successfully");
            }
        }
    });
});

app.delete('/person/:id',(req,res,next)=>{
    var stringRequest = `delete from details where id="${req.params.id}"`;
    res.locals.connection.query(stringRequest, function (error, results, fields) {
        if (error) throw error;
        if(results.affectedRows == 0){
            res.send("No PERSON with specific ID");
        }else{
            res.send("Deleted Successfully");
        }
    });
});

var port = 8081;
var server = app.listen(port, function () {
    console.log(`RESTService is running on port ${port}....`);
});
