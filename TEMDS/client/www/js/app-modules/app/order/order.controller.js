angular.module('temds.app.controllers')


.controller('CreateOrderCtrl', function ($scope, $state, $stateParams, $localstorage, $ionicPopup, OrderService, VenueService) {
    var user = $localstorage.getObject('user');
    $scope.addressbook = user.address;
    $scope.items = [''];
    $scope.showDelete = false;
    $scope.selected = {};
    $scope.comment = {};

    // find primary/default address
    for (var i in $scope.addressbook) {
        if ($scope.addressbook[i].primary) {
            $scope.selected.address = $scope.addressbook[i];
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
        console.log($scope.selected.address.name);
        // prepare order items
        var orderItems = [];
        for (var i in $scope.items) {
            if ($scope.items[i].trim() != '') {
                orderItems.push({
                    description: $scope.items[i]
                });
            }
        }
        if (orderItems.length <= 0) {
            $ionicPopup.alert({
                title: 'Item Missing',
                content: 'There is no item in this order. Please add at least one item to create an order.'
            });
        } else {
            // prepare order object
            var order = {
                uId: user.id,
                venue: $scope.venue,
                address: $scope.selected.address,
                status: _ORDER_STATUS_CREATED_,
                items: orderItems,
                comment: $scope.comment.txt
            };
            // send to confirmation
            $state.go('app.confirm-order', {
                'order': order
            });
        }
    };
})


.controller('ConfirmOrderCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
    $scope.order = $stateParams.order;

    $scope.createOrder = function () {
        // prepare delivery address
        var order = angular.copy($scope.order);

        order.vId = $scope.order.venue.id;

        delete order["venue"]
        delete order.address["id"];
        delete order.address["name"];
        delete order.address["primary"];

        console.log(order);
    }
})


.controller('OrderHistoryCtrl', function ($scope, $filter, OrderService) {

})


.controller('OrderDetailCtrl', function ($scope, $filter, OrderService) {

});