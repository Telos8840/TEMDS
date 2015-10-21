angular.module('temds.app.controllers')


.controller('CreateOrderCtrl', function ($scope, $state, $stateParams, OrderService, VenueService) {
    $scope.orders = [];
    $scope.orders.push('');

    $scope.showDelete = false;

    //temp
    VenueService.getVenueDetail('venueId')
        .then(function (data) {
            $scope.venue = data;
            console.log($scope.venue);
        });

    console.log($stateParams.venue);

    $scope.deleteItemAt = function (i) {
        console.log(i);
        $scope.orders.splice(i, 1);
    }
})


.controller('ConfirmOrderCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
    var venueId = $stateParams.venueId;
})


.controller('OrderHistoryCtrl', function ($scope, $filter, OrderService) {

})


.controller('OrderDetailCtrl', function ($scope, $filter, OrderService) {

});