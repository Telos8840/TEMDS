angular.module('temds.app.controllers')


    .controller('VenueListCtrl', function ($scope, $state, $filter, $stateParams, VenueService) {
        $scope.sortedVenueList = {}; // this should be displayed
        $scope.venueList = []; // this is the raw list data from server

        $scope.refreshData = function () {
            VenueService.getVenueList()
                .then(function (data) {
                    $scope.venueList = $filter('orderBy')(data.list, '+name', false);
                    $scope.sortByName(); // default
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };


        $scope.getList = function () {
            VenueService.getVenueList()
                .then(function (data) {
                    $scope.venueList = $filter('orderBy')(data.list, '+name', false);
                    $scope.sortByName(); // default
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };
        $scope.getList();


        /**
         * Sort the list by name.
         * This should be the default sort method.
         */
        $scope.sortByName = function () {
            var l = {};

            for (var i in $scope.venueList) {
                var letter = $scope.venueList[i].name.charAt(0).toUpperCase();
                if (!letter.match(/[a-zA-Z]/)) letter = "#";
                if (!l[letter]) l[letter] = [];
                l[letter].push($scope.venueList[i]);
            }

            $scope.sortedVenueList = l;
        };

        $scope.showVenueDetail = function (venue) {
            $state.go('app.venue-detail', {
                venue: venue
            })
        }
    })
    .controller('VenueDetailCtrl', function ($scope, $state, $stateParams, $ionicHistory, VenueService, uiGmapGoogleMapApi) {
        // isFromVenueList is true if user is creating a new order from browsing venues.
        // It is false if user was already creating a delivery and is picking venue.
        var isFromVenueList = false;
        var histories = $ionicHistory.viewHistory().histories;
        $scope.days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        
        for (var k in histories) {
            if (k.startsWith('ion') &&k.length >= 4 && parseInt(k.substr(3)) >= 0) {
                isFromVenueList = histories[k].stack.length == 2;
                break;
            }
        }

        $scope.submitBtnText = isFromVenueList ? 'Create Order' : 'Select Venue';
        var venueId = $stateParams.venue._id;
        $scope.venueName = $stateParams.venue.name; // TODO: Change

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
                                        "center": {
                                            latitude: lat,
                                            longitude: lng
                                        },
                                        "options": {
                                            "zoomControl": false,
                                            "minZoom": 12,
                                            "maxZoom": 20,
                                            "mapTypeControl": false,
                                            "streetViewControl": false,
                                            "draggable": true,
                                            "panControl": false,
                                            "optimized": true,
                                            "mapTypeId": "roadmap",
                                            "styles": _MAP_STYLE_
                                        },
                                        "zoom": 13
                                    };

                                    $scope.map.markers = [{
                                        "id": "50651",
                                        "latitude": lat,
                                        "longitude": lng,
                                        "options": {
                                            "animation": 1
                                        }
                                    }];
                                } else {
                                    cosnole.log("No results found");
                                }
                            } else {
                                console.log("Geocode was not successful for the following reason: " + status);
                            }
                        });
                    } else {console.log("WTF IS GEOCODE? I NO HAVE!");}
                });
        });

        /**
         * Redirect to new order view.
         * Send venue information to order from.
         */
        $scope.createOrder = function () {
            if (isFromVenueList) {
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.order-create', {
                    index: -1
                });
            } else {
                $ionicHistory.goBack(-2);
            }
        };
    })