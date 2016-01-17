/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 12/13/15
 * Time: 4:21 PM
 */

var response    = require('../helpers/response');
var token       = require('../helpers/token');
var utility     = require('../helpers/utility');
var _           = require('lodash');

/*****************************
 *         ORDER API         *
 *****************************/
module.exports = function (server, db) {
  /**
   * Adds new delivery
   *
   * @param uId
   * @param deliveryAddress
   * @param orders
   * @param status
   */
  server.post('api/delivery/addDelivery', function (req, res, next) {
    console.log("\n *** Adding new delivery *** \n");

    token.validate(req, res, function () {
      req.params = utility.addTimestamp(req.params);
      req.params.confirmationNumber = "";

      db.deliveries.insert(req.params, function (err, dbOrder) {
        if (err) response.error(res, "Error inserting delivery", err);
        else {
          var conNum = Date.now().toString(16).toUpperCase();

          db.deliveries.update(
            {_id: db.ObjectId(dbOrder._id)},
            {$set: {confirmationNumber: conNum}},
            function (err) {
              if (err) response.error(res, "Error adding delivery", err);
              else response.sendJSON(res, { id: dbOrder._id, confirmationNumber: conNum });
            });
        }
      });
    });
    return next();
  });

  /**
   * Gets delivery detail
   *
   * @param id
   */
  server.get('api/delivery/deliveryDetail/:id', function (req, res, next) {
    console.log("\n *** Getting delivery detail *** \n");

    token.validate(req, res, function () {
      var id = req.params.id;

      db.deliveries.findOne({ _id: db.ObjectId(id) }, function (err, dbOrder) {
        if (err) response.error(res, "Error finding delivery by id - " + id, err);
        else if (!dbOrder) response.error(res, "Can't find delivery " + id);
        else {
          var venueIds = _.map(dbOrder.orders, function (o) {
            return db.ObjectId(o.vId);
          });

          db.venues.find({ _id: { $in: venueIds } }, function (err, dbVenues) {
            if (err) response.error(res, "Error finding venues", err);
            else {
              var orders = [];
              _.forEach(dbOrder.orders, function (value) {
                var venue = _.find(dbVenues, function (v) {
                  return v._id = value.vId;
                });

                value = _.omit(value, 'vId');
                value.venue = venue;
                orders.push(value);
              });

              dbOrder.orders = orders;
              response.sendJSON(res, dbOrder);
            }
          });
        }
      });
    });
    return next();
  });

  /**
   * Gets delivery status
   *
   * @param id
   */
  server.get('api/delivery/getStatus/:id', function (req, res, next) {
    console.log("\n *** Getting delivery status *** \n");

    token.validate(req, res, function () {
      var id = req.params.id;

      db.deliveries.findOne({_id: db.ObjectId(id)}, function (err, dbOrder) {
        if (err) response.error(res, "Error finding delivery by id - " + id, err);
        else if (!dbOrder) response.error(res, "Can't find delivery " + id, err);
        else {
          response.sendJSON(res, dbOrder.status);
        }
      });
    });
    return next();
  });

  /**
   * Cancels delivery
   *
   * @param id
   */
  server.put('api/delivery/cancelDelivery', function (req, res, next) {
    console.log("\n *** Canceling delivery *** \n");

    token.validate(req, res, function (decoded) {
      db.deliveries.findOne({ _id: db.ObjectId(req.params.id) }, function (err, dbOrder) {
        console.log("order", dbOrder);

        if (err) response.error(res, "Error getting deliveries");
        else if (dbOrder.uId != decoded._id) response.unauthorized(res, "Unauthorized user trying to cancel someone elses order");
        else {
          switch (parseInt(dbOrder.status)) {
            case utility.orderStatus.created:
            case utility.orderStatus.processing:
              db.deliveries.findAndModify({
                query: { _id: db.ObjectId(req.params.id) },
                update: { $set: { status: utility.orderStatus.canceled, modifiedDate: new Date() } }
              }, function (err) {
                if (err) response.error(res, "Error canceling delivery status");
                else response.success(res, "Successfully canceled delivery status");
              });
              break;
            default:
              response.conflict(res, "", "No longer able to cancel order");
              break;
          }
        }
      });
    });
    return next();
  });

  /**
   * Update delivery status
   *
   * @param id
   * @param status
   */
  server.put('api/delivery/updateStatus', function (req, res, next) {
    console.log("\n *** Updating status for delivery " + req.params.id + " *** \n");

    token.validate(req, res, function () {
      var id    = req.params.id,
        status  = req.params.status;

      db.deliveries.findAndModify(
        {
          query: { _id: db.ObjectId(id) },
          update: { $set: { status: status, modifiedDate: new Date() } }
        }, function (err) {
          if (err) response.error(res, "Error updating delivery status");
          else response.success(res, "Successfully updated delivery status");
        });
    });
    return next();
  });

  /**
   * Gets delivery history
   *
   * @param uId
   * @param pageNumber
   * @param itemsPerPage
   */
  server.get('api/delivery/getDeliveryHistory/:uId/:pageNumber/:itemsPerPage', function (req, res, next) {
    console.log("\n *** Getting delivery history for user " + req.params.uId + "*** \n");

    token.validate(req, res, function () {
      var uId         = req.params.uId,
        pageNumber    = req.params.pageNumber,
        itemsPerPage  = req.params.itemsPerPage,
        skip          = itemsPerPage * (pageNumber - 1);

      db.deliveries.find({ uId: uId }, {_id: true, status: true, insertDate: true},
        function (err, dbOrders) {
          if (err) response.error(res, "Error getting deliveries for user id - " + uId);
          else if (!dbOrders) response.error(res, "Can't find deliveries for user id - " + uId);
          else {
            var totalOrders = _.size(dbOrders),
              totalPages  = _.ceil(totalOrders/itemsPerPage),
              orderList   = dbOrders.slice(skip, skip + itemsPerPage),
              json        = {
                items: orderList,
                totalPages: totalPages
              };
            response.sendJSON(res, json);
          }
        });
    });
    return next();
  });
};