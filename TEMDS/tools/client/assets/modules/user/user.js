'use strict';
angular.module('user', [])
    .config(function ($stateProvider) {
        //declare states for user-module
        $stateProvider.state('user', {
            url: '/user',
            controller: 'UserController',
            //This module is admin only
            data: {
                requiresRole: 'admin'
            },
            resolve: {
                userlist: function (UserFactory) {
                    return UserFactory.getUsers();
                }
            },
            templateUrl: 'templates/user/index.html',
            animation: {
                enter: 'slideInRight',
                leave: 'slideOutRight'
            }
        });
    })
    .run(function () {});