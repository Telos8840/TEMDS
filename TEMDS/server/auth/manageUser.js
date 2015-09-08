/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/30/15
 * Time: 5:37 PM
 */

var pwdMgr = require('./managePasswords');
var nodeMailer = require('nodemailer');				//http://blog.nodeknockout.com/post/34641712180/sending-email-from-nodejs

//TODO: Get SMTP authentication from businessowner
var smtpTransport = nodeMailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "tester@ghlee.com",
    pass: "testerPassword"
  }
});

var sendConfirmationEmail = function (res, email) {
  // Send confirmation email
  // TODO: Make email body sexier!
  smtpTransport.sendMail({
    from: "TEMDS Sender <donotreply@temds.com>", // sender address
    to: "<"+email+">", // comma separated list of receivers
    subject: "TEMDS - Email Confirmation Number",
    text: ""
  }, function(error, response) {
    if (error) res.send(error);
    else res.send('Confirmation sent to ' + email + '.');
  });
  // TODO: Push confirmation number and email to db

};

/****************************
 *         USER API         *
 ****************************/
module.exports = function (server, db) {

  // unique index
  db.pending_users.ensureIndex({
    "Email": 1
  }, {
    unique: true
  });

  // Create new user
  server.post('api/user/register', function (req, res, next) {
    console.log("\n *** User being registered *** \n");

    var userEmail = req.params.email;
    db.users.findOne({Email: userEmail}, function (err, userExists) {
      console.log("Looking in users table");

      // Check if user already exists in main user table
      if (err) {
        console.log("Error registering email \n");

        res.writeHead(400, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify({
          error: err,
          message: "Error trying to find email"
        }));

      } else if(!err && !userExists) {
        // User doesn't exist in main User table
        // Check if they're in pending table
        db.pending_users.findOne({Email: userEmail}, function (err, penUser) {
          console.log("Looking in pending users");

          if (err) {
            res.writeHead(400, {
              'Content-Type': 'application/json; charset=utf-8'
            });

            res.end(JSON.stringify({
              error: err,
              message: "Error trying to find email"
            }));
          } else if(!err && penUser) {
            console.log("User exists in both tables");

            // User exists in pending users, resend confirmation email
            //sendConfirmationEmail(res, penUser.Email);

            res.writeHead(204, {
              'Content-Type': 'application/json; charset=utf-8'
            });

            res.end(JSON.stringify({
              message: "User already registered. Confirmation email resent"
            }));
          } else if(!err && !penUser) {
            // Add user to pending users
            // 5 digit confirmation number
            var cnfrm = (""+Math.random()).substring(2,7);
            var user = {
              Email: userEmail,
              ConfirmationNumber: cnfrm,
              InsertDate: new Date(),
              ModifiedDate: new Date()
            };

            db.pending_users.insert(user, function (err, dbUser) {

              if(err) {
                console.log(err);

              }
              console.log("User created", dbUser);

              //sendConfirmationEmail(res, dbUser);
              res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(dbUser));

            });
          }
        });
      } else {
        console.log("Email already exists \n");

        res.writeHead(204, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify({
          message: "A user with this email already exists"
        }));
      }
    });

    return next();
  });

  server.post('api/user/confirmUser', function (req, res, next) {
    var user = req.params;
    pwdMgr.cryptPassword(user.password, function (err, hash) {
      user.password = hash;

      db.users_dev.insert(user,
        function (err, dbUser) {

        });
    });
    return next();
  })
};