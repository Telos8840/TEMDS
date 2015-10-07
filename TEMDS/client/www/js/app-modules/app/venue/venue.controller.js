angular.module('temds.app.controllers')


.controller('VenueListCtrl', function ($scope, $state, $filter, VenueService) {
    $scope.sortedVenueList = {}; // this should be displayed
    $scope.venueList = []; // this is the raw list data from server


    $scope.refreshData = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                $scope.venueList = $filter('orderBy')(data.list, '+name', false);
                $scope.$broadcast('scroll.refreshComplete');
            });
    };


    $scope.getList = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                $scope.venueList = $filter('orderBy')(data.list, '+name', false);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
    $scope.getList();


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
});