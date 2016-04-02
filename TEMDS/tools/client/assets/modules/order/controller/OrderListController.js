/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderListController', function($scope, OrderFactory, helper, appParams) {

        function setDefault() {
            $scope.itemsPerPageOptions = [45, 100, 200, 300];
            $scope.itemsPerPage = $scope.itemsPerPageOptions[0];
            $scope.pageNumber = 0;

            $scope.status = [];
            for (var s in appParams.OrderStatus) {
                $scope.status.push( {
                    status: helper.camelToNormalString(s, true),
                    addFilter: false
                });
            }

            console.log($scope.status);

            $scope.listOptions = {
                sortByAsc: false,
                sortBy: 'insertDate',
                filters: []
            };
        }

        function getOrderList() {
            OrderFactory.GetOrderList($scope.pageNumber, $scope.itemsPerPage, $scope.listOptions)
                .then(function(data) {
                    $scope.orderList = data.list;
                    //var totalOrders = data.total;
                    console.log('orderList>\n', $scope.orderList); //TODO: DELETE
                });
        }

        setDefault();
        getOrderList();
    });
