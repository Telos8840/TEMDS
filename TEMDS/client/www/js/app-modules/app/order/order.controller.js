angular.module('temds.app.controllers')


.controller('CreateOrderCtrl', function ($scope, $state, $stateParams, $localstorage, OrderService, VenueService) {
    var user = $localstorage.getObject('user');
    $scope.addressbook = user.address;
    $scope.items = [''];
    $scope.showDelete = false;
    $scope.selectedAddress = {};

    // find primary/default address
    for (var i in $scope.addressbook) {
        if ($scope.addressbook[i].primary) {
            $scope.selectedAddress = $scope.addressbook[i];
            break;
        }
    }

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
    };

    /**
     * Go to order confirm view.
     * Create order object here.
     */
    $scope.confirmOrder = function () {
        var orderItems = [];

        for (var i in $scope.items) {
            orderItems.push({
                description: $scope.items[i]
            });
        }
        // TODO: Finish this
        var order = {
            uId: user.id,
            vId: $scope.venue.id,
            aId: 'Address Id Goes Here!',
            status: _ORDER_STATUS_CREATED_,
            items: orderItems,
            comment: 'Comment goes here!'
        };

        console.log(order);
    };
})


.controller('ConfirmOrderCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
    $scope.order = $stateParams.order;
    console.log($scope.order);
})


.controller('OrderHistoryCtrl', function ($scope, $filter, OrderService) {

})


.controller('OrderDetailCtrl', function ($scope, $filter, OrderService) {

});