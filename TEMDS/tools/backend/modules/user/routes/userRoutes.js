'use strict';
var express = rq('express'),
    toolsUserController = rq('toolsUserController'),
    userController = rq('userController'),
    jwt = rq('express-jwt'),
    rolesCheck = rq('rolesCheck');
var jwtCheck = jwt({
    secret: process.env.SECRET
});
var app = module.exports = express.Router();
//The following routes are only available for Users with admin role
app.use('/', jwtCheck, rolesCheck(['admin']));
app.get('/users', toolsUserController.listUsers);
app.get('/:id', toolsUserController.getUserById);
app.put('/:id', toolsUserController.updateUserById);
app.delete('/:id', toolsUserController.deleteUserById);

// Client User Account

// Client User Detail
app.get('/clients/:id/account', userController.GetUserAccountById);
app.get('/clients/:id/detail', userController.GetUserDetailById);
app.get('/clients/:id', userController.GetUserById);