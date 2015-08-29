/**
* Created with PhpStorm.
* User: Saul Guardado
* Date: 8/23/15
* Time: 9:02 PM
*/

var restify           = require('restify'),
	nodemailer        = require('nodemailer'),				//http://blog.nodeknockout.com/post/34641712180/sending-email-from-nodejs
	restifyValidation = require('node-restify-validation'), //https://github.com/z0mt3c/node-restify-validation/blob/master/README.md
	server            = restify.createServer();

var mongojs = require('mongojs'),
    db      = mongojs('temdsapp');

//TODO: Get SMTP authentication from businessowner
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "tester@ghlee.com",
       pass: "testerPassword"
   }
});

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

/****************************
 *         USER API         *
 ****************************/
// Create new user
server.post({url: '/user/new', 
	validation: {
		resources: {
			email: { isRequired: true, isEmail: true }
		}
	}
}, function (req, res, next) {
	// 5 digit confirmation number
	var cnfrm = (""+Math.random()).substring(2,7);
	// Send confirmation email
	// TODO: Make email body sexier!
	smtpTransport.sendMail({
		from: "TEMDS Sender <donotreply@temds.com>", // sender address
		to: "<"+req.params.email+">", // comma separated list of receivers
		subject: "TEMDS - Email Confirmation Number",
		text: cnfrm
	}, function(error, response) {
		if (error) res.send(error);
		else res.send('Confirmation sent to ' + req.params.email + '.');
	});
	// TODO: Push confirmation number and email to db

});
