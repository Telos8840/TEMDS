/**
 * Created by GLee on 3/26/16.
 */
'use strict';
var _ = rq('lodash');
var Orders = rq('orderModel');
var Collections = rq('collectionsModel');

/**
 * Get list of orders
 *     Filter by order status
 *     Sort by insertDate(default) or modifiedDate, DESC(default)/ASC
 * @param req
 * @param res
 * @constructor
 */
module.exports.GetOrderList = function (req, res) {
    // Page number
    var pageNum = parseInt(req.params.pageNum);
    if (pageNum < 0) pageNum = 0;

    // Item count per page
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if (itemsPerPage <= 0) itemsPerPage = 45;

    // Sort
    var sortByAsc = req.query.sortByAsc === 'true',
        sortBy = req.query.sortBy;
    if (!sortBy) sortBy = 'insertDate';

    // Optional filter <Status>: listed item will be filtered out from the list
    var statusFilter = [];
    _(req.query.filters.split(',')).forEach(function(value) {
        if (value && value != '')
            statusFilter.push({status: parseInt(value)});
    });

    // Build Query
    var query = statusFilter.length > 0 ? { $or: statusFilter } : {};

    Orders.count(query, function(err, count) {
        if (err) {
            return res.status(400)
                .send('Error on GetOrderList: Unable to get count.\n' + err);
        }

        // Nothing found
        if (count <= 0) {
            return res.status(200).json({
                list: [],
                total: count
            });
        }

        // Build sort
        var sort  = {};
        sort[sortBy] = sortByAsc ? 'asc' : 'desc';

        // Return paginated result
        Orders.find(query)
            .sort(sort)
            .skip(pageNum * itemsPerPage)
            .limit(itemsPerPage)
            .exec(function(err, result) {
                if (err) {
                    return res.status(400)
                        .send ('Error on GetOrderList: \n' + err);
                }

                return res.status(200).json({
                    list: result,
                    total: count,
                    page: pageNum
                });
            });
    });
};

module.exports.GetOrderDetail = function(req, res) {
    var oId = req.params.orderId;

    Orders
        .findOne({_id: oId})
        .exec(function(err, order) {
            if (err) {
                return res.status(400)
                    .send ('Error on GetOrderDetail: \n' + err);
            }
            if (order === null)
                return res.status(404)
                    .send ('Error on GetOrderDetail: Unable to find order with id, "' + oId + '" \n' + err);

            return res.status(200).json(order);
        });
};

module.exports.GetOrderByConfirmationNumber = function(req, res) {
    var oConfirmNum = req.params.confirmNum;

    Orders.findOne({confirmationNumber: oConfirmNum})
        .exec(function(err, order) {
            if (err) {
                return res.status(400)
                    .send ('Error on GetOrderByConfirmationNumber: \n' + err);
            }
            if (order === null)
                return res.status(404)
                    .send ('Error on GetOrderByConfirmationNumber: Unable to find order with confirmation number, "' + oConfirmNum + '" \n' + err);

            return res.status(200).json(order);
        });
};

module.exports.UpdateOrder = function(req, res) {
    if (!req.body) {
        return res.status(400).send("Error in UpdateOrder: Cannot update order with undefined request");
    } else {
        var updateRequest = req.body;
        Orders.findOne({_id: updateRequest.id})
            .exec(function(err, order) {
                if(err) {
                    return res.status(400).send("Cannot update the order:\n" + err);
                }

                updateRequest= _.omit(updateRequest, 'id');
                order = _.extend(order, updateRequest);
                order.save(function (err) {
                    if(err) {
                        return res.status(400).send('Cannot save the order:\n' + err);
                    }

                    return res.status(200).send('Order #' + order.confirmationNumber + ' updated successfully');
                });

            });
    }
};