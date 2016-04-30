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
        function getUser(uId) {
            UserFactory.getUserById(uId)
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
                    getUser($scope.order.uId);
                });
        }

        notification.addNotification({
            title: 'In Progress',
            content: 'I\'m working on it!',
            autoclose: 200
        });

        // Scope Methods

        // Google Map
        /*
        uiGmapGoogleMapApi.then(function(maps) {
            VenueService.getVenueDetail(venueId)
                .then(function (data) {
                    $scope.venue = data;
                    // Get Location
                    var geocoder = new google.maps.Geocoder();
                    if (geocoder) {
                        geocoder.geocode({
                            'address': $scope.venue.address.addr1 + ', ' +
                            $scope.venue.address.city + ', ' +
                            $scope.venue.address.state + ' ' +
                            $scope.venue.address.zipcode
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                                    var lat = results[0].geometry.location.lat();
                                    var lng = results[0].geometry.location.lng();
                                    $scope.map = {
                                        'center': {
                                            latitude: lat,
                                            longitude: lng
                                        },
                                        'options': {
                                            'zoomControl': false,
                                            'minZoom': 12,
                                            'maxZoom': 20,
                                            'mapTypeControl': false,
                                            'streetViewControl': false,
                                            'draggable': true,
                                            'panControl': false,
                                            'optimized': true,
                                            'mapTypeId': 'roadmap',
                                            'styles': _MAP_STYLE_
                                        },
                                        'zoom': 13
                                    };

                                    $scope.map.markers = [{
                                        'id': '50651',
                                        'latitude': lat,
                                        'longitude': lng,
                                        'options': {
                                            'animation': 1
                                        }
                                    }];
                                } else {
                                    cosnole.log('No results found');
                                }
                            } else {
                                console.log('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    } else {console.log('WTF IS GEOCODE? I NO HAVE!');}
                });
        });*/

        // Init
        getOrderDetail();
    });
