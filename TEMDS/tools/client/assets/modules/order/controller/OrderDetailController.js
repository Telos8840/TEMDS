/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderDetailController', function($scope, $timeout, OrderFactory, VenueFactory, UserFactory, helper, $stateParams, NotificationFactory) {
        var orderId = $stateParams.orderId,
            notification = new NotificationFactory({
            id: 'orderDetailNotification',
            position: 'top-middle'
        });

        // ViewData
        $scope.order = {};
        $scope.user = {};

        // Private Methods

        /**
         * Get user detail:
         *     After fetching order detail, get user detail from its uid
         * @param uid
         */
        function getUserDetail(uId) {
            UserFactory.getUserDetailById(uId)
                .then(function(data) {
                    $scope.user = data;
                    console.log('User> ', data); //TODO: debug use
                });
        }

        function getVenueDetail(vId) {
            VenueFactory.getVenueById(vId)
                .then(function(data) {
                    $scope.venue = data;
                    console.log('Venue> ', data); // TODO: debug use
                });
        }

        /**
         *  Get Order Detail
         */
        function getOrderDetail() {
            OrderFactory.GetOrderDetail(orderId)
                .then(function(data) {
                    $scope.order = data;
                    console.log('Order> ',data); //TODO: debug use
                    getUserDetail($scope.order.uId);
                });
        }

        notification.addNotification({
            title: 'In Progress',
            content: 'I\'m working on it!',
            autoclose: 200
        });

        getOrderDetail();
    });
