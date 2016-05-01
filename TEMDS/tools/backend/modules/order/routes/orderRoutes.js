/**
 * Created by GLee on 3/26/16.
 */
'use strict';

var express = rq('express'),
    orderController = rq('orderController'),
    jwt = rq('express-jwt'),
    rolesCheck = rq('rolesCheck');

var jwtCheck = jwt({
    secret: process.env.SECRET
});

var app = module.exports = express.Router();

//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin']));
app.get('/li/:pageNum/:itemsPerPage?', orderController.GetOrderList);
app.get('/:orderId', orderController.GetOrderDetail);
app.get('/:confirmNum/confirmNum', orderController.GetOrderByConfirmationNumber);