/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/23/15
 * Time: 9:02 PM
 */

var restify           = require('restify'),
  restifyValidation = require('node-restify-validation'), //https://github.com/z0mt3c/node-restify-validation/blob/master/README.md
  mongojs           = require('mongojs'),
  config            = require('./config'),
  db                = mongojs(config.database, config.collections, { authMechanism : 'ScramSHA1' }),
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

// Allow custom token header
server.pre(restify.CORS());
restify.CORS.ALLOW_HEADERS.push('temdstoken');

server.listen(process.env.PORT || 9804, function () {
  if (!process.env.PORT) {
    config.prod = false;
    console.log("Dev mode enabled");
  }

  console.log("Server started @", process.env.PORT || 9804)
});

var authentication  = require('./auth/authentication')(server, db);
var manageUsers     = require('./auth/manageUser')(server, db);
var manageVenues    = require('./venue/manageVenue')(server, db);
var manageDeliveries    = require('./delivery/manageDeliveries')(server, db);