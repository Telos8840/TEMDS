angular.module('temds.app.controllers')


.controller('VenueListCtrl', function ($scope, $state, VenueService) {
    $scope.venueList = [];


    $scope.refreshData = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                $scope.venueList = data.list;
                $scope.$broadcast('scroll.refreshComplete');
            });
    };


    $scope.getList = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                $scope.venueList = data.list;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
    $scope.getList();
});