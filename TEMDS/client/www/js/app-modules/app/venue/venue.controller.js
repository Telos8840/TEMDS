angular.module('temds.app.controllers')


.controller('VenueListCtrl', function ($scope, $state, VenueService) {
    var venuList = [];
    $scope.getList = function () {
        VenueService.loadVenueList()
            .then(function (data) {
                venuList = data;
            });
    };
    $scope.getList();
    console.log(venuList);
});