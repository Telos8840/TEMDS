/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderDetailController', function($scope, $timeout, NotificationFactory, OrderFactory, VenueFactory, UserFactory, helper, $stateParams, appParams, drivers) {
        var orderId = $stateParams.orderId,
            notification = new NotificationFactory({
                id: 'orderDetailNotification',
                position: 'top-right'
            });

        // ViewData
        $scope.order = {};
        $scope.user = {};
        $scope.orderStatusOptions = appParams.OrderStatus;
        $scope.usStates = appParams.USStates;
	    $scope.drivers = drivers;
        $scope.selectedDriver = null;

        // Private Methods

        /**
         * Get user detail:
         *     After fetching order detail, get user detail from its uid
         * @param uid
         */
        function getUser(uId) {
            UserFactory.getUserById(uId)
                .then(function(data) {
                    $scope.user = data;
                });
        }

        /**
         *  Get Order Detail
         */
        function getOrderDetail() {
            OrderFactory.GetOrderDetail(orderId)
                .then(function(data) {
                    $scope.order = data;
                    console.log($scope.order);
                    if (!$scope.order.driver) {
                        $scope.order.driver = {username: 'None'};
                    }
                    getUser($scope.order.uId);

                    // fetch venue details
                    angular.forEach($scope.order.orders, function(o) {
                        VenueFactory.getVenueById(o.vId)
                            .then(function(data) {
                                o.v = data;
                            });
                    });
                });
        }

        // Scope Methods

        /**
         * Passthrough method to OrderFactory.GetOrderStatusDescription
         * @param str
         * @returns {*}
         */
        $scope.getStatusDescription = function(statusCode) {
            return OrderFactory.GetOrderStatusDescription(statusCode);
        };

        /**
         * Update order. Used by xeditable fields to update address, recipient, and status
         * @param data
         * @param property
         * @param id
         * @returns {*}
         */
        $scope.updateOrder= function(data, property, id) {
            var request = { id: id };
            request[property] = data;
            return OrderFactory.UpdateOrder(request)
                .then(function(data) {
                    notification.addNotification({
                        title: 'Success',
                        content: data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                    $scope.refreshPage(); //parent scope refresh
                    return true;
                }, function(data) {
                    notification.addNotification({
                        title: 'Error',
                        content: data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                    return false;
                });
        };

        // Init
        getOrderDetail();
    });
