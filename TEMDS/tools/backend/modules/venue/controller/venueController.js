/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/20/15
 * Time: 10:03 PM
 */
'use strict';
var _ = rq('lodash');
var Venue = rq('venueModel');
var VenueDetail = rq('venueDetailModel');

module.exports.addVenue = function (req, res) {
  if (!req.body.venue || !req.body.detail) {
    return res.status(400).send("Somethings broken! Better Call Saul!")
  } else {
    var venue = new Venue();
    venue = _.extend(venue, req.body.venue); // copy its value as-is to destination

    venue.save(function (err) {
      if(err) {
        console.log(err);
        return res.status(500)
          .send('Something went wrong adding venue');
      } else {
        var detail = new VenueDetail();
        req.body.detail.venueId = venue._id;
        detail = _.extend(detail, req.body.detail);

        detail.save(function (err) {
          if(err) {
            console.log(err);
            return res.status(500)
              .send('Something went wrong adding venue details');
          } else {
            return res.status(201)
              .send(venue.name + ' added successfully');
          }
        });
      }
    });
  }
};

module.exports.getNames = function (req, res) {
  Venue.find({}).select('name').exec(function (err, venue) {
    if(err) {
      return res.status(400)
        .send("Can't load venue data");
    } else {
      res.json(venue);
    }
  });
};

module.exports.getVenue = function (req, res) {
  Venue.findById(req.params.id, function (err, venue) {
    if(err) {
      return res.status(400)
        .send("Can't find venue");
    } else {
      VenueDetail.find({venueId: req.params.id}).exec(function (err, detail) {
        if(err) {
          return res.status(400)
            .send("Can't find venue details");
        } else {
          var obj = {venue: venue, detail: detail[0]};
          res.json(obj);
        }
      });
    }
  });
};

module.exports.editVenue = function (req, res) {
  if (!req.body.venue || !req.body.detail) {
    return res.status(400).send("Somethings broken! Better Call Saul!")
  } else {
    //Venue.findById(req.params.Id);
  }
};