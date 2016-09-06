/**
 * Created by Saul on 9/5/16.
 */

'use strict';
var _ = rq('lodash');
var Orders = rq('orderModel');
var Venue = rq('venueModel');

module.exports.GetMyDeliveries = function (req, res) {
	var id = req.params.id;

	Orders.find({"driver._id": id}).exec(function (err, ordersDB) {
		if (err) {
			return res.status(400)
				.send ('Error getting orders for user: \n' + err);
		} else {
			var updatedOrders = [];
			_(ordersDB).forEach(function (order) {
				var newOrder = [];
				_(order.orders).forEach(function (o) {

					Venue.findById(o.vId, function (err, venue) {
						if(err) {
							return res.status(400)
								.send("Can't find venue \n" + err);
						} else {
							o = _.omit(o, 'vId');
							o.venue = venue;
							newOrder.push(o);
							console.log('pushing new');
						}
					});
				});
			});

			res.json(ordersDB);
		}
	});
};