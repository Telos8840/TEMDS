/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/30/15
 * Time: 5:37 PM
 */

var response    = require('../helpers/response');
var _           = require('lodash');
var pwdMgr      = require('./managePasswords');

/****************************
 *         USER API         *
 ****************************/
module.exports = function (server, db) {

  /**
   * Gets user information
   *
   * @param id
   */
  server.get('api/user/getInfo/:id', function (req, res, next) {
    console.log("\n *** Getting user information *** \n");

    var id = req.params.id;

    db.user_detail.findOne({userKey: db.ObjectId(id)}, function (err, dbUser) {
      if (err || !dbUser) response.error(res, "User ID not found - " + id, err);
      else response.sendJSON(res, dbUser);
    });
    return next();
  });

  /**
   * Updates User Name
   *
   * @param id
   * @param fName
   * @param lName
   */
  server.put('api/user/update/name', function (req, res, next) {
    console.log("\n *** Updating users name *** \n");

    var id    = req.params.id,
        fName = req.params.fName,
        lName = req.params.lName;

    if (_.size(fName) == 0 || _.size(lName) == 0){
      response.invalid(res, "Names not valid");
      return next();
    }

    db.user_detail.findOne({userKey: db.ObjectId(id)}, function (err, dbUser) {
      if (err || !dbUser) response.error(res, "User ID not found - " + id, err);
      else {
        db.user_detail.update({_id: db.ObjectId(dbUser._id)},
          {$set: {fName: fName, lName: lName, modifiedDate: new Date()}},
          function (err, data) {
            if (err) response.error(res, "Error updating name");
            else response.success(res, "Updated name");
          });
      }
    });
    return next();
  });

  /**
   * Updates User Phone Number
   *
   * @param id
   * @param phoneNum
   */
  server.put('api/user/update/phoneNum', function (req, res, next) {
    console.log("\n *** Updating users phone number *** \n");

    var id        = req.params.id,
        phoneNum  = req.params.phoneNum;

    if (_.size(phoneNum) == 0) {
      response.invalid(res, "Phone number not valid");
      return next();
    }

    db.user_detail.findOne({userKey: db.ObjectId(id)}, function (err, dbUser) {
      if (err || !dbUser) response.error(res, "User ID not found - " + id, err);
      else {
        db.user_detail.update({_id: db.ObjectId(dbUser._id)},
          {$set: {phoneNum: phoneNum, modifiedDate: new Date()}},
          function (err, data) {
            if (err) response.error(res, "Error updating phone number");
            else response.success(res, "Updated phone number");
          });
      }
    });
    return next();
  });

  /**
   * Updates User Password
   *
   * @param id
   * @param oldPass
   * @param newPass
   */
  server.put('api/user/update/password', function (req, res, next) {
    console.log("\n *** Updating users password *** \n");

    var id      = req.params.id,
        oldPass = req.params.oldPass.trim(),
        newPass = req.params.newPass.trim();

    if(_.size(oldPass) < 6 || _.size(newPass) < 6) {
      response.invalid(res, "Invalid passwords");
      return next();
    }

    db.users.findOne({_id: db.ObjectId(id)}, function (err, dbUser) {
      pwdMgr.comparePassword(oldPass, dbUser.saltPassword, function (err, isMatch) {
        if (err) response.error(res, "Error checking password", err);
        else {
          if (!isMatch) response.invalid(res, "Old password doesn't match");
          else {
            pwdMgr.cryptPassword(newPass, function (err, hash) {
              if (err) response.error(res, "Error hashing password", err);
              else {
                db.users.findAndModify({
                  query: { _id: db.ObjectId(dbUser._id) },
                  update: { $set: { saltPassword: hash } },
                  new: true
                }, function (err) {
                  if (err) response.error(res, "Error saving new password");
                  else response.sendJSON(res, {saltPass: hash});
                });
              }
            });
          }
        }
      });
    });
    return next();
  });

  /**
   * Adds new address to given users list of existing addresses
   *
   * @param id
   * @param name
   * @param addr1
   * @param addr2
   * @param city
   * @param state
   * @param zipcode
   * @param primary
   */
  server.post('api/user/addAddress', function (req, res, next) {
    console.log("\n *** Adding new address *** \n");

    var detail = req.params;

    db.user_detail.findOne({userKey: db.ObjectId(detail.id)}, function (err, dbDetail) {
      if (err) response.error(res, "Error finding user_detail id - " + detail.id, err);
      else if (!dbDetail) response.error(res, "Can't find id in user detail " + detail.id, err);
      else {

        var newAdd = {
          id: db.ObjectId(),
          name: detail.name,
          addr1: detail.addr1,
          addr2: detail.addr2,
          city: detail.city,
          state: detail.state,
          zipcode: detail.zipcode,
          primary: detail.primary
        };

        if(detail.primary == true) {
          _.forEach(dbDetail.address, function (n) {
            if(n.primary) n.primary = false;
          });

          dbDetail.address.unshift(newAdd);
        } else {
          dbDetail.address.push(newAdd);
        }

        db.user_detail.update({userKey: db.ObjectId(detail.id)},
          {$set: {address: dbDetail.address, modifiedDate: new Date()}}, function (err, data) {
            if (err) response.error(res, "Error updating details for " + detail.id, err);
            else response.sendJSON(res, {addressId: newAdd.id});
          });
      }
    });
    return next();
  });

  /**
   * Update given user address
   *
   * @param userId
   * @param addressId
   * @param name
   * @param addr1
   * @param addr2
   * @param city
   * @param state
   * @param zipcode
   * @param primary
   */
  server.put('api/user/update/address', function (req, res, next) {
    console.log("\n *** Updating user address *** \n");

    var address = req.params;

    db.user_detail.findOne({userKey: db.ObjectId(address.userId)}, function (err, dbDetail) {
      if (err) response.error(res, "Error finding user_detail id - " + detail.id, err);
      else if (!dbDetail) response.error(res, "Can't find id in user detail " + detail.id, err);
      else {
        if(address.primary == true) {
          _.forEach(dbDetail.address, function (add) {
            add.primary = false;
          });
        }

        var isEdited = false;
        var addToEdit = dbDetail.address;
        _.forEach(addToEdit, function (add) {
          if (add.id == address.addressId) {
            add.name = address.name;
            add.addr1 = address.addr1;
            add.addr2 = address.addr2;
            add.city = address.city;
            add.state = address.state;
            add.zipcode = address.zipcode;
            add.primary = address.primary;

            isEdited = true;
          }
        });

        if (!isEdited) response.invalid(res, "Address Id not found");
        else{
          db.user_detail.update({_id: db.ObjectId(dbDetail._id)},
            {$set: {address: addToEdit, modifiedDate: new Date()}},
            function (err) {
              if (err) response.error(res, "Error updating address", err);
              else response.success(res, "Successfully updated address");
            });
        }
      }
    });
    return next();
  });
  /**
   * Gets list of address for given user
   *
   * @param id
   * @param itemPerList
   * @param listNumber
   */
  server.get('api/user/getAddresses/:id', function (req, res, next) {
    console.log("\n *** Getting addresses *** \n");

    //var itemPerList = req.params.itemPerList,
    //  listNumber  = req.params.listNumber;

    db.user_detail.findOne({userKey: db.ObjectId(req.params.id)}, function (err, dbDetail) {
      if (err) response.error(res, "Error finding user_detail id - " + req.params.id, err);
      else if (!dbDetail) response.error(res, "Can't find id in user detail " + req.params.id, err);
      else {
        var addresses = dbDetail.address;
          //skip      = itemPerList * (listNumber - 1);

        //var totalPosts = addresses.length,
        //  totalPages = _.ceil(totalPosts / itemPerList);
        //
        //var addressList = addresses.slice(skip, skip + itemPerList);
        //
        //var json = {
        //  addressList: addressList,
        //  totalPages: totalPages
        //};

        response.sendJSON(res, addresses);
      }
    });
    return next();
  });
};