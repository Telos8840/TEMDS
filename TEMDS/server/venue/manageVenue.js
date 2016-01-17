/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 11/7/15
 * Time: 11:16 AM
 */

var response    = require('../helpers/response');
var _           = require('lodash');

/*****************************
 *         VENUE API         *
 *****************************/
module.exports = function (server, db) {

  /**
   * Gets venue list
   *
   * @param timestamp
   */
  server.get('api/venue/list/:timestamp', function (req, res, next) {
    console.log("\n *** Getting venue list *** \n");

    token.validate(req, res, function () {
      var timeStamp = req.params.timestamp;

      db.collections_updated.find({}, function (err, updated) {
        if (err) response.error(res, "Error getting updates", err);
        else {
          var venueDate = new Date(updated[0].venues);
          timeStamp = new Date(timeStamp);

          if(timeStamp.getTime() >= venueDate.getTime()) {
            response.noUpdates(res, "No new venues");
          } else {
            db.venues.find({},
              {
                _id: true,
                name: true,
                category: true,
                thumbnail: true
              },
              function (err, venues) {
                if (err) response.error(res, "Error finding venues", err);
                else {
                  var jsonObj = { list: venues, timestamp: venueDate };
                  response.sendJSON(res, jsonObj);
                }
              });
          }
        }
      });
    });
    return next();
  });

  /**
   * Gets venue detail
   *
   * @param venueId
   */
  server.get('api/venue/detail/:venueid', function (req, res, next) {
    console.log("\n *** Getting venue detail *** \n");

    token.validate(req, res, function () {
      db.venue_details.findOne({ venueId: db.ObjectId(req.params.venueid) }, function (err, detail) {
        if (err) response.error(res, "Error finding venue_detail by venueId - " + req.params.venueid, err);
        else if (!detail) response.error(res, "Can't find venueId in venue detail " + req.params.venueid, err);
        else {
          db.venues.findOne({ _id: db.ObjectId(req.params.venueid) },
            function (err, venue) {
              if (err) response.error(res, "Error finding venue_detail by venueId - " + req.params.venueid, err);
              detail.category = venue.category;
              response.sendJSON(res, detail);
            });

        }
      });
    });
    return next();
  });
};