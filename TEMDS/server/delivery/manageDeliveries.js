/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 12/13/15
 * Time: 4:21 PM
 */

var status      = require('../helpers/orderStatus');
var response    = require('../helpers/response');
var _           = require('lodash');

/*****************************
 *         ORDER API         *
 *****************************/
module.exports = function (server, db) {
  /**
   * Adds new order
   *
   * @param uId
   * @param deliveryAddress
   * @param orders
   * @param status
   */
  server.post('api/delivery/addDelivery', function (req, res, next) {
    console.log("\n *** Adding new order *** \n");

    req.params.confirmationNumber = "";

    db.deliveries.insert(req.params, function (err, dbOrder) {
      if (err) response.error(res, "Error inserting order", err);
      else {
        var conNum = Date.now().toString(16).toUpperCase();

        db.deliveries.update(
          {_id: db.ObjectId(dbOrder._id)},
          {$set: {confirmationNumber: conNum}},
          function (err) {
            if (err) response.error(res, "Error adding delivery", err);
            else response.sendJSON(res, {confirmationNumber: conNum});
          });
      }
    });

    return next();
  });

  /**
   * Gets order status
   *
   * @param id
   */
  server.get('api/delivery/getStatus', function (req, res, next) {
    console.log("\n *** Getting order status *** \n");

    var id = req.params.id;

    db.deliveries.findOne({_id: db.ObjectId(id)}, function (err, dbOrder) {
      if (err) response.error(res, "Error finding order by id - " + id, err);
      else if (!dbOrder) response.error(res, "Can't find order " + id, err);
      else {
        response.sendJSON(res, dbOrder.status);
      }
    });

    return next();
  });

  /**
   * Update order status
   *
   * @param id
   * @param status
   */
  server.put('api/delivery/updateStatus', function (req, res, next) {
    console.log("\n *** Updating status for order " + req.params.id + " *** \n");

    var id      = req.params.id,
      status  = req.params.status;

    db.deliveries.findAndModify(
      {
        query: { _id: db.ObjectId(id) },
        update: { $set: { status: status } }
      }, function (err) {
        if (err) response.error(res, "Error updating order status");
        else response.success(res, "Successfully updated order status");
      });

    return next();
  });

  /**
   * Update order status
   *
   * @param uId
   * @param pageNumber
   * @param itemsPerPage
   */
  server.get('api/delivery/getDeliveryHistory', function (req, res, next) {
    console.log("\n *** Getting order history for user " + req.params.uId + "*** \n");

    var uId           = req.params.uId,
      pageNumber    = req.params.pageNumber,
      itemsPerPage  = req.params.itemsPerPage,
      skip          = itemsPerPage * (pageNumber - 1);

    db.deliveries.find({ uId: uId }, function (err, dbOrders) {
      if (err) response.error(res, "Error getting orders for user id - " + uId);
      else if (!dbOrders) response.error(res, "Can't find orders for user id - " + uId);
      else {
        var totalOrders = _.size(dbOrders),
          totalPages  = _.ceil(totalOrders/itemsPerPage),
          orderList   = dbOrders.slice(skip, skip + itemsPerPage),
          json        = {
            orderList: orderList,
            totalPages: totalPages
          };

        response.sendJSON(res, json);
      }
    });

    return next();
  });
};