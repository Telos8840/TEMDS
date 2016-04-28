/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderDetailController', function($scope, $timeout, OrderFactory, helper, $stateParams, NotificationFactory) {
        var orderId = $stateParams.orderId;

        $scope.order = {};

        var notification = new NotificationFactory({
            id: 'orderNotification',
            position: 'top-middle'
        });

        /**
         *
         */
        function getOrderDetail() {
            OrderFactory.GetOrderDetail(orderId)
                .then(function(data) {
                    $scope.order = data;

                    console.log(data); //TODO: debug use
                });
        }
        getOrderDetail();
    });
