'use strict';
var express = rq('express'),
    userController = rq('userController'),
    userDetailController = rq('userDetailController'),
    jwt = rq('express-jwt'),
    rolesCheck = rq('rolesCheck');
var jwtCheck = jwt({
    secret: process.env.SECRET
});
var app = module.exports = express.Router();
//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin']));
app.get('/users', userController.listUsers);
app.get('/:id', userController.getUserById);
app.put('/:id', userController.updateUserById);
app.delete('/:id', userController.deleteUserById);

// Client User Detail
app.get('/clients/:id', userDetailController.GetUserById);