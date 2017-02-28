/**
 * Created by Saul on 9/5/16.
 */

'use strict';
var _ = rq('lodash');
var Orders = rq('orderModel');

module.exports.GetMyDeliveries = function (req, res) {
	var id = req.params.id;

	Orders.find({"driver._id": id}).exec(function (err, ordersDB) {
		if (err) {
			return res.status(400)
				.send ('Error getting orders for user: \n' + err);
		} else {
			res.json(ordersDB);
		}
	});
};