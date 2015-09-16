/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/30/15
 * Time: 5:37 PM
 */

var _ = require('lodash');

/****************************
 *         USER API         *
 ****************************/
module.exports = function (server, db) {

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
        });

        response.success(res, "Address added to user list");
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
  server.get('api/user/getAddresses/:id/:itemPerList/:listNumber', function (req, res, next) {
    console.log("\n *** Getting addresses *** \n");

    console.log("params", req.params);

    var itemPerList = req.params.itemPerList,
        listNumber  = req.params.listNumber;

    db.user_detail.findOne({userKey: db.ObjectId(req.params.id)}, function (err, dbDetail) {
      if (err) response.error(res, "Error finding user_detail id - " + req.params.id, err);
      else if (!dbDetail) response.error(res, "Can't find id in user detail " + req.params.id, err);
      else {
        var addresses = dbDetail.address,
            skip      = itemPerList * (listNumber - 1);

        var totalPosts = addresses.length,
            totalPages = _.ceil(totalPosts / itemPerList);

        var addressList = addresses.slice(skip, skip + itemPerList);

        var json = {
          addressList: addressList,
          totalPages: totalPages
        };

        response.sendJSON(res, json);
      }
    });
    return next();
  });
};