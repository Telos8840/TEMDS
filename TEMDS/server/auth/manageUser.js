/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/30/15
 * Time: 5:37 PM
 */

var response = require('../helpers/response');
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

        response.error(res, "Error trying to find email in users table");

      } else if(!err && !userExists) {

        // User doesn't exist in main User table
        // Check if they're in pending table
        db.pending_users.findOne({Email: userEmail}, function (err, penUser) {
          console.log("Looking in pending users");

          if (err) {

            response.error(res, "Error trying to find email in pending_users table", err);

          } else if(!err && penUser) {

            console.log("User exists in table, regenerating confirm number");

            var cnfrm = (""+Math.random()).substring(2,7);
            penUser.ConfirmationNumber = cnfrm;

            db.pending_users.update({Email: userEmail}, { $set: {ConfirmationNumber: cnfrm, ModifiedDate: new Date()} },
              function (err, data) {
                if(err) response.error(res, "Error updating activation number for " + userEmail, err);
              });

            // User exists in pending users, resend confirmation email
            sendConfirmationEmail(res, penUser);
            response.success(res, "User already registered. Confirmation email resent to " + userEmail);

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

              if(err) response.error(res, "Error inserting pending_user - " + userEmail, err);

              sendConfirmationEmail(res, dbUser);

              response.success(res, "User inserted into pending_users - " + userEmail);
            });
          }
        });
      } else {
        response.error(res, "Error a user with this email already exists - " + userEmail, err);
      }
    });

    return next();
  });

  /**
   * Checks pending users confirmation number and activates account
   * @param email
   * @param confirmNum
   */
  server.post('api/user/confirmationNumber', function (req, res, next) {
    console.log("\n *** Checking user email and confirmation number *** \n");

    var email       = req.params.email,
        confirmNum  = parseInt(req.params.confirmNum);

    db.pending_users.findOne({Email: email}, function (err, dbUser) {
      if (err) {
        response.error(res, "Error finding email - " + email, err);

      } else if(!err && dbUser) {
        var dbConfirm = parseInt(dbUser.ConfirmationNumber);

        if(confirmNum == dbConfirm) {

          db.pending_users.update({Email: email}, { $set: {Activated: true, ModifiedDate: new Date()} },
            function (err, data) {
              if(err) response.error(res, "Error updating user " + email, err);
              else response.success(res, "User activated " + email);

          });
        } else {
          response.error(res, "Error: Confirmation number doesn't match for " + email, err);
        }
      } else {
        response.error(res, "Error: Email doesn't exist - " + email, err);
      }
    });

    return next();
  });

  /**
   * API to register new user. Checks if user has activated account
   * via confirmation number. If account is activated, delete record
   * from pending users and add to main user table.
   *
   * @param email
   * @param fName
   * @param lName
   * @param birthday
   * @param phoneNum
   * @param rawPassword
   */
  server.post('api/user/registerUser', function (req, res, next) {
    console.log("\n *** Registering new user *** \n");

    var user = req.params;

    pwdMgr.cryptPassword(user.rawPassword, function (err, hash) {
      user.rawPassword = hash;

      db.pending_users.findOne({Email: user.email} , function (err, penUser) {
        if (!penUser) response.error(res, "User not found");

        console.log("user found", penUser);

        if(penUser.Activated) {

          var userInsert = {
            Email: user.email,
            Password: user.rawPassword,
            InsertDate: new Date(),
            ModifiedDate: new Date()
          };

          console.log("user table", userInsert);

          db.users.insert(userInsert, function (err, actUser) {
            if(err) {
              response.error(res, "Error inserting into user table - " + userInsert.email, err);
            } else {
              db.pending_users.remove({_id: db.ObjectId(penUser._id)}, function (err, data) {
                if (err) response.error(res, "Error deleting user - " + actUser.email, err);
              });

              var userDetail = {
                UserKey: actUser._id,
                FirstName: user.fName,
                LastName: user.lName,
                Phone: user.phoneNum,
                Birthday: user.bday,
                Address: {},
                InsertDate: new Date(),
                ModifiedDate: new Date()
              };

              console.log("user detail", userDetail);

              db.user_detail.insert(userDetail, function (err, detail) {
                if (err) response.error(res, "Error inserting user detail for - " + user.email, err);
                else response.success(res, "User Registered");
              });
            }
          });
        } else {
          response.error(res, "User hasn't used confirmation number yet - " + user.email, err);
        }
      });
    });
    return next();
  });
};