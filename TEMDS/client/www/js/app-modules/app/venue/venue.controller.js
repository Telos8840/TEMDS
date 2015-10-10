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


.controller('VenueDetailCtrl', function ($scope, $state, $stateParams, uiGmapGoogleMapApi, VenueService) {
    var venueId = $stateParams.venueId;
    VenueService.getVenueDetail(venueId)
        .then(function (data) {
            $scope.venue = data;
            console.log($scope.venue);
        });

    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8,
        options: {
            scrollwheel: false,
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
    };


    uiGmapGoogleMapApi.then(function (maps) {

        $scope.options = {};
    });
});