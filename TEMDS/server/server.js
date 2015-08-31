/**
* Created with PhpStorm.
* User: Saul Guardado
* Date: 8/23/15
* Time: 9:02 PM
*/

var databaseUrl = 'mongodb://admin:T3m284D107$@ds035663.mongolab.com:35663/temds';
var collections = ['users_dev'];

var restify           = require('restify'),
	  restifyValidation = require('node-restify-validation'), //https://github.com/z0mt3c/node-restify-validation/blob/master/README.md
    mongojs           = require('mongojs'),
    db                = mongojs(databaseUrl, collections),
	  server            = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restifyValidation.validationPlugin( {
	errorsAsArray: false
}));

// CORS (Cross Origin Request Sharing)
server.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

function respond(req, res, next) {
	res.send('hello ' + req.params.name);
	next();
}

//http://localhost:9804/hello/saul
server.get('/hello/:name', respond);

server.listen(process.env.PORT || 9804, function () {
	console.log("Server started @ ", process.env.PORT || 9804)
});

var manageUsers =   require('./auth/manageUser')(server, db);