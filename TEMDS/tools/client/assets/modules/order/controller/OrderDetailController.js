/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderDetailController', function($scope, $timeout, OrderFactory, VenueFactory, UserFactory, helper, $stateParams) {
        var orderId = $stateParams.orderId;

        // ViewData
        $scope.order = {};
        $scope.user = {};

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

        // Init
        getOrderDetail();
    });
