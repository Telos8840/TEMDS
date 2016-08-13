/**
 * Created by Saul on 4/25/16.
 */

'use strict';
var express = rq('express'),
	mediaController = rq('mediaController'),
	jwt = rq('express-jwt'),
	rolesCheck = rq('rolesCheck');
var jwtCheck = jwt({
	secret: process.env.SECRET
});
var app = module.exports = express.Router();
//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin']));
app.get('/signamazon/:name/:type/:venueId', mediaController.signAmazon);
app.post('/upload', mediaController.uploadToAmazon);