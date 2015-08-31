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
  // 5 digit confirmation number
  var cnfrm = (""+Math.random()).substring(2,7);
  // Send confirmation email
  // TODO: Make email body sexier!
  smtpTransport.sendMail({
    from: "TEMDS Sender <donotreply@temds.com>", // sender address
    to: "<"+email+">", // comma separated list of receivers
    subject: "TEMDS - Email Confirmation Number",
    text: cnfrm
  }, function(error, response) {
    if (error) res.send(error);
    else res.send('Confirmation sent to ' + email + '.');
  });
  // TODO: Push confirmation number and email to db

}

/****************************
 *         USER API         *
 ****************************/
module.exports = function (server, db) {

  // unique index
  db.users_dev.ensureIndex({
    email: 1
  }, {
    unique: true
  })

  // Create new user
  server.post('api/user/register', function (req, res, next) {
    console.log("here!!");

    var user = req.params;
    pwdMgr.cryptPassword(user.password, function (err, hash) {
      user.password = hash;
      console.log("object", user);
      console.log(db);

      db.users_dev.insert(user,
        function (err, dbUser) {
          if (err) { // duplicate key error
            if (err.code == 11000) {
              res.writeHead(400, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify({
                error: err,
                message: "A user with this email already exists"
              }));
            }
          } else {
            //sendConfirmationEmail(res, user.email);
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            dbUser.password = "";
            res.end(JSON.stringify(dbUser));
          }
        });
    });
    return next();
  });
};