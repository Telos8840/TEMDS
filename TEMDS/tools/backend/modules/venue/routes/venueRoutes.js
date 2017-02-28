/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/20/15
 * Time: 9:46 PM
 */

'use strict';
var express = rq('express'),
  venueController = rq('venueController'),
  jwt = rq('express-jwt'),
  rolesCheck = rq('rolesCheck');

var jwtCheck = jwt({
  secret: process.env.SECRET
});

var app = module.exports = express.Router();

//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin']));
app.post('/addvenue', venueController.addVenue);
app.get('/getnames', venueController.getNames);
app.get('/getvenue/:id', venueController.getVenue);
app.put('/editvenue/', venueController.editVenue);