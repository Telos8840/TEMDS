angular.module('temds.app.controllers')


.controller('VenueListCtrl', function ($scope, $filter, VenueService) {
    $scope.sortedVenueList = {}; // this should be displayed
    $scope.venueList = []; // this is the raw list data from server


    $scope.refreshData = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                $scope.venueList = $filter('orderBy')(data.list, '+name', false);
                $scope.sortByName(); // default
                $scope.$broadcast('scroll.refreshComplete');
            });
    };


    $scope.getList = function () {
        VenueService.loadVenueList()
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
})


.controller('VenueDetailCtrl', function ($scope, $state, $stateParams, uiGmapIsReady, VenueService) {
    var venueId = $stateParams.venueId;
    VenueService.getVenueDetail(venueId)
        .then(function (data) {
            $scope.venue = data;
        });

    // Default map object
    $scope.map = {
        center: {
            latitude: 34.05, // los angeles
            longitude: -118.25
        },
        zoom: 12,
        options: {
            scrollwheel: true,
            zoomControl: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,
            disableDoubleClickZoom: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: true,
            streetViewControl: false,
            overviewMapControl: false,
            rotateControl: false,
        }
    }

    /**
     * Redirect to new order view.
     * Send venue information to order from.
     */
    $scope.createOrder = function () {
        $state.go('app.new-order', {
            'venue': $scope.venue
        });
    }

    /* Find location by address and mark it on the map */
    uiGmapIsReady.promise() // this gets all (ready) map instances - defaults to 1 for the first map
        .then(function (instances) { // instances is an array object
            var venueMap = instances[0].map; // if only 1 map it's found at index 0 of array

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
                            venueMap.panTo(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: venueMap,
                                title: 'Hello World!'
                            });
                        } else {
                            cosnole.log("No results found");
                        }
                    } else {
                        console.log("Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        });

});