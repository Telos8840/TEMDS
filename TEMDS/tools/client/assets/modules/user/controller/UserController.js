'use strict';
angular.module('user')
    .controller('UserController', function ($scope, UserFactory, userlist) {
        $scope.userlist = userlist;
        $scope.UserFactory = UserFactory;
    });