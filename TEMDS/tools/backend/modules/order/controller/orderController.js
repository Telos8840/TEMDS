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
    console.log('I AM HERE!!!!!!!!!');

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
    _(req.query.filters.split(',')).forEach(function(value) {
        console.log(value);
    });
    var filters = 1;


    console.log('pageNum> \n',pageNum,'itemsPerPage>\n', itemsPerPage, 'sortByAsc>\n',sortByAsc, 'filters>\n',filters);

    // Query
    var q = {};

    //TODO: add pageNum/pageCount/filter/sort to the query
    Orders.find({}).exec(function (err, result) {
        if (err) {
            return res.status(400)
                .send ("Error on GetOrderList: \n" + err);
        } else {
            return res.status(200).json(result);
        }
    });
};