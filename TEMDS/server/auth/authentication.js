/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 9/15/15
 * Time: 9:54 PM
 */

var response    = require('../helpers/response');
var pwdMgr      = require('./managePasswords');
var nodeMailer  = require('nodemailer');				//http://blog.nodeknockout.com/post/34641712180/sending-email-from-nodejs
var _           = require('lodash');

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
  console.log("Sending email to: ", user.email);

  var mailOptions = {
    from: "TEMDS Sender <donotreply@temds.com>", // sender address
    to: "<"+user.email+">", // comma separated list of receivers
    subject: "TEMDS - Email Confirmation Number",
    text: "Confirmation Number: " + user.confirmationNumber
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    console.log("email response: ", response);
    if (error) console.log("Error sending email");
    else console.log("Email sent successfully");
  });
  // TODO: Push confirmation number and email to db

};

/****************************
 *    AUTHENTICATION API    *
 ****************************/
module.exports = function (server, db) {

  // unique index
  db.pending_users.ensureIndex({
    "email": 1
  }, {
    unique: true
  });

  db.users.ensureIndex({
    "email": 1
  }, {
    unique: true
  });

  /**
   * Adds new user to pending users table. Creates confirmation number and emails to user.
   *
   * @param email
   */
  server.post('api/auth/emailConfirmation', function (req, res, next) {
    console.log("\n *** User submitting email to create account *** \n");

    var userEmail = req.params.email;
    db.users.findOne({email: userEmail}, function (err, userExists) {

      // Check if user already exists in main user table
      if (err) {

        response.error(res, "Error trying to find email in users table");

      } else if (!err && !userExists) {

        // User doesn't exist in main User table
        // Check if they're in pending table
        db.pending_users.findOne({email: userEmail}, function (err, penUser) {

          if (err) {

            response.error(res, "Error trying to find email in pending_users table", err);

          } else if (!err && penUser) {

            console.log("User exists in table, regenerating confirm number");

            var cnfrm = ("" + Math.random()).substring(2, 7);
            penUser.confirmationNumber = cnfrm;

            db.pending_users.update({_id: db.ObjectId(penUser._id)},
              {$set: {confirmationNumber: cnfrm, activated: false, modifiedDate: new Date()}},
              function (err, data) {
                if (err) response.error(res, "Error updating activation number for " + userEmail, err);
              });

            // User exists in pending users, resend confirmation email
            sendConfirmationEmail(res, penUser);
            response.success(res, "User already registered. Confirmation email resent to " + userEmail);

          } else if (!err && !penUser) {
            // Add user to pending users
            // 5 digit confirmation number
            var cnfrm = ("" + Math.random()).substring(2, 7);
            var user = {
              email: userEmail,
              confirmationNumber: cnfrm,
              activated: false,
              insertDate: new Date(),
              modifiedDate: new Date()
            };

            db.pending_users.insert(user, function (err, dbUser) {

              if (err) response.error(res, "Error inserting pending_user - " + userEmail, err);

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
   * Checks pending users confirmation number and activates account.
   *
   * @param email
   * @param confirmNum
   */
  server.post('api/auth/confirmationNumber', function (req, res, next) {
    console.log("\n *** Checking user email and confirmation number *** \n");

    var email = req.params.email,
      confirmNum = parseInt(req.params.confirmNum);

    db.pending_users.findOne({email: email}, function (err, dbUser) {
      if (err) {
        response.error(res, "Error finding email - " + email, err);

      } else if (!err && dbUser) {
        var dbConfirm = parseInt(dbUser.confirmationNumber);

        if (confirmNum == dbConfirm) {

          db.pending_users.update({_id: db.ObjectId(dbUser._id)}, {$set: {activated: true, modifiedDate: new Date()}},
            function (err, data) {
              if (err) response.error(res, "Error updating user " + email, err);
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
   * @param bDay
   * @param phoneNum
   * @param rawPassword
   */
  server.post('api/auth/registerUser', function (req, res, next) {
    console.log("\n *** Registering new user *** \n");

    var user = req.params;

    pwdMgr.cryptPassword(user.rawPass.trim(), function (err, hash) {
      user.rawPassword = hash;

      db.pending_users.findOne({email: user.email}, function (err, penUser) {
        if (err || !penUser) response.error(res, "Error finding user - " + user.email, err);

        console.log("user found", penUser);

        if (penUser.activated) {

          var userInsert = {
            email: user.email,
            saltPassword: user.rawPassword,
            insertDate: new Date(),
            modifiedDate: new Date()
          };

          console.log("user table", userInsert);

          db.users.insert(userInsert, function (err, actUser) {
            if (err) {
              response.error(res, "Error inserting into user table - " + userInsert.email, err);
            } else {
              db.pending_users.remove({_id: db.ObjectId(penUser._id)}, function (err, data) {
                if (err) response.error(res, "Error deleting user - " + actUser.email, err);
              });

              var address = [];
              var newAdd = {
                id: db.ObjectId(),
                name: user.address.name,
                addr1: user.address.addr1,
                addr2: user.address.addr2,
                city: user.address.city,
                state: user.address.state,
                zipcode: user.address.zipcode,
                primary: user.address.primary
              };

              address.push(newAdd);

              var userDetail = {
                userKey: actUser._id,
                fName: user.fName,
                lName: user.lName,
                phoneNum: user.phoneNum,
                bDay: user.bDay,
                address: address,
                insertDate: new Date(),
                modifiedDate: new Date()
              };

              console.log("user detail", userDetail);

              db.user_detail.insert(userDetail, function (err, detail) {
                if (err) response.error(res, "Error inserting user detail for - " + user.email, err);
                else {
                  var userRes = {
                    id: actUser._id,
                    saltPass: actUser.rawPassword
                  };
                  response.sendJSON(res, userRes);
                }
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

  /**
   * User login
   *
   * @param email
   * @param rawPass
   */
  server.post('api/auth/signIn', function (req, res, next) {
    console.log("\n *** User logging in *** \n");

    var email     = req.params.email,
        rawPass   = req.params.rawPass;
    console.log(req.params);


    if(_.size(email.trim()) == 0 || _.size(rawPass.trim()) == 0) {
      response.error(res, "Invalid email");
      return next();
    }

    db.users.findOne({email: email}, function (err, dbUser) {
      if (err || !dbUser) response.error(res, "Error finding user - " + email, err);
      else {
        pwdMgr.comparePassword(rawPass, dbUser.saltPassword, function (err, isMatch) {
          if (err) response.error(res, "Error checking password", err);
          else if(isMatch) {
            db.user_detail.findOne({userKey: db.ObjectId(dbUser._id)}, function (err, dbDetail) {
              if (err || !dbUser) response.error(res, "User ID not found - " + dbUser._id, err);
              else {

                var jsonRes = {
                  id: dbUser._id,
                  saltPass: dbUser.saltPassword,
                  email: dbUser.email,
                  fName: dbDetail.fName,
                  lName: dbDetail.lName,
                  phoneNum: dbDetail.phoneNum,
                  address: dbDetail.address
                };

                response.sendJSON(res, jsonRes);
              }
            });
          }
          else response.invalid(res, "Password doesn't match");
        });
      }
    });
    return next();
  });

  /**
   * User re-authentication
   *
   * @param id
   * @param saltPass
   */
  server.post('api/auth/reAuth', function (req, res, next) {
    console.log("\n *** Re-authenticating user *** \n");

    var id      = req.params.id,
        saltPass = req.params.saltPass;

    if(_.size(id.trim()) == 0 || _.size(saltPass.trim()) == 0) {
      response.error(res, "Invalid id or password");
      return next();
    }

    db.users.findOne({_id: db.ObjectId(id)}, function (err, dbUser) {
      if (err || !dbUser) response.error(res, "Error finding user - " + id, err);
      else {
        var match = _.isEqual(saltPass, dbUser.saltPassword);
        if (match) response.success(res, "User authenticated")
        else response.invalid(res, "Password doesn't match");
      }
    });

    return next();
  });
};