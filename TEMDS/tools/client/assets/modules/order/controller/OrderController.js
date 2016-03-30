/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderController', function($scope, OrderFactory) {
        setDefault();

        OrderFactory.GetOrderList($scope.pageNumber, $scope.itemsPerPage, $scope.listOptions)
            .then(function(_orderList) {
                $scope.orderList = _orderList;
                console.log('orderList>\n', $scope.orderList);
            });

        // Defaults
        function setDefault() {
            $scope.itemsPerPageOptions = [45, 100, 200, 300];
            $scope.itemsPerPage = $scope.itemsPerPageOptions[0];
            $scope.pageNumber = 0;

            $scope.listOptions = {
                sortByAsc: false,
                sortBy: 'insertDate',
                filters: [_ORDER_STATUS_CREATED_]
            };

            console.log($scope.listOptions.filters);
        }
    });
