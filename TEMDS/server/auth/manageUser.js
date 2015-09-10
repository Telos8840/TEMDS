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

/**
 * Sends email to given user with confirmation number
 * @param res
 * @param email
 */
var sendConfirmationEmail = function (res, user) {
  // Send confirmation email
  // TODO: Make email body sexier!
  console.log("Sending email to: ", user.Email);

  var mailOptions = {
    from: "TEMDS Sender <donotreply@temds.com>", // sender address
    to: "<"+user.Email+">", // comma separated list of receivers
    subject: "TEMDS - Email Confirmation Number",
    text: "Confirmation Number: " + user.ConfirmationNumber
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    console.log("email response: ", response);

    if (error) {
      console.log("Error sending email: ", error);

      res.send(error);
    }
    else {
      console.log("Email successfully sent");

      res.send('Confirmation sent to ' + user.Email + '.');
    }
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

  db.users.ensureIndex({
    "Email": 1
  }, {
    unique: true
  });

  /**
   * Adds new user to pending users table. Creates confirmation number and emails to user
   * @param email
   */
  server.post('api/user/emailConfirmation', function (req, res, next) {
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
            sendConfirmationEmail(res, penUser);

            res.writeHead(400, {
              'Content-Type': 'application/json; charset=utf-8'
            });

            res.end(JSON.stringify({
              message: "Error user already registered. Confirmation email resent"
            }));
          } else if(!err && !penUser) {
            // Add user to pending users
            // 5 digit confirmation number
            var cnfrm = (""+Math.random()).substring(2,7);
            var user = {
              Email: userEmail,
              ConfirmationNumber: cnfrm,
              Activated: false,
              InsertDate: new Date(),
              ModifiedDate: new Date()
            };

            db.pending_users.insert(user, function (err, dbUser) {

              if(err) {
                console.log(err);

              }
              console.log("User created", dbUser);

              sendConfirmationEmail(res, dbUser);

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
          message: "Error a user with this email already exists"
        }));
      }
    });

    return next();
  });

  /**
   * Checks pending users confirmation number and activates account
   * @param email
   * @param confirmNum
   */
  server.get('api/user/emailConfirmation', function (req, res, next) {
    console.log("\n *** Checking user email and confirmation number *** \n");

    var email       = req.params.email,
        confirmNum  = parseInt(req.params.confirmNum);

    db.pending_users.findOne({Email: email}, function (err, dbUser) {
      if (err) {
        console.log("Error finding email \n");

        res.writeHead(400, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify({
          error: err,
          message: "Error trying to find email"
        }));
      } else if(!err && dbUser) {
        var dbConfirm = parseInt(dbUser.ConfirmationNumber);

        if(confirmNum == dbConfirm) {
          console.log("Confirmation numbers match");

          db.pending_users.update({Email: email}, { $set: {Activated: true, ModifiedDate: new Date()} },
            function (err, data) {
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify("User email confirmed"));
          });
        } else {
          console.log("Confirmation numbers don't match");

          res.writeHead(400, {
            'Content-Type': 'application/json; charset=utf-8'
          });

          res.end(JSON.stringify({
            error: err,
            message: "Error: Confirmation number doesn't match"
          }));
        }
      } else {
        console.log("Email doesn't exist");

        res.writeHead(400, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify({
          error: err,
          message: "Error: Email doesn't exist"
        }));
      }
    });

    return next();
  })
};