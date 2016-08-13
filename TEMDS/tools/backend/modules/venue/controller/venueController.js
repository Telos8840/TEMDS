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
var Collections = rq('collectionsModel');

module.exports.addVenue = function (req, res) {
	if (!req.body.venue || !req.body.detail) {
		return res.status(400).send("Somethings broken! Better Call Saul!")
	} else {
		var venue = new Venue();
		venue = _.extend(venue, req.body.venue); // copy its value as-is to destination

		venue.save(function (err) {
			if(err) {
				console.log(err);
				return res.status(400)
					.send('Something went wrong adding venue \n' + err);
			} else {
				var detail = new VenueDetail();
				req.body.detail.venueId = venue._id;
				detail = _.extend(detail, req.body.detail);

				detail.save(function (err) {
					if(err) {
						console.log(err);
						Venue.remove({_id: venue._id}).exec(); // delete venue to avoid conflicts
						return res.status(400)
							.send('Something went wrong adding venue details \n' + err);
					} else {
						Collections.find({}).exec(function (err, collection) {
							collection[0].venues = new Date();
							collection[0].venue_details = new Date();
							collection[0].save();
						});
						return res.status(200)
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
				.send("Can't load venue data \n" + err);
		} else {
			res.json(venue);
		}
	});
};

module.exports.getVenue = function (req, res) {
	Venue.findById(req.params.id, function (err, venue) {
		if(err) {
			return res.status(400)
				.send("Can't find venue \n" + err);
		} else {
			VenueDetail.find({venueId: req.params.id}).exec(function (err, detail) {
				if(err) {
					return res.status(400)
						.send("Can't find venue details \n" + err);
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
		Venue.findById(req.body.venue.venueId._id, function (err, venue) {
			if(err) {
				return res.status(400)
					.send("Couldn't update the venue \n" + err);
			} else {
				req.body.venue = _.omit(req.body.venue, 'venueId');
				venue = _.extend(venue, req.body.venue);

				venue.save(function (err) {
					if(err) {
						console.log(err);
						return res.status(400)
							.send('Something went wrong updating venue \n' + err);
					} else {
						VenueDetail.findById(req.body.detail.detailId._id, function (err, detail) {
							if(err) {
								return res.status(400).send("Couldn't update the venue \n" + err);
							} else {
								req.body.detail = _.omit(req.body.detail, 'detailId');
								detail = _.extend(detail, req.body.detail);

								detail.save(function (err) {
									if(err) {
										console.log(err);
										return res.status(400).send("Something went wrong updating the venue \n" + err);
									} else {
										Collections.find({}).exec(function (err, collection) {
											collection[0].venues = new Date();
											collection[0].venue_details = new Date();
											collection[0].save();
										});
										return res.status(200)
											.send(venue.name + ' updated successfully');
									}
								})
							}
						});
					}
				});
			}
		});
	}
};