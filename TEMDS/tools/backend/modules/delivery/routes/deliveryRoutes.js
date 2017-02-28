/**
 * Created by Saul on 9/3/16.
 */

'use strict';

var express = rq('express'),
	deliveryController = rq('deliveryController'),
	jwt = rq('express-jwt'),
	rolesCheck = rq('rolesCheck');

var jwtCheck = jwt({
	secret: process.env.SECRET
});

var app = module.exports = express.Router();

//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin', 'driver']));
app.get('/getmydeliveries/:id', deliveryController.GetMyDeliveries);
