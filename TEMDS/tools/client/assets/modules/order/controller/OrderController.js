/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderController', function($scope, OrderFactory) {
        $scope.itemsPerPageOptions = [45, 100, 200, 300];
        $scope.itemsPerPage = $scope.itemsPerPageOptions[0];
        //$scope.orderList = orderList;

    });
