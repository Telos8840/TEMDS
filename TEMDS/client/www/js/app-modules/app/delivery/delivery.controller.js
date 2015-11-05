angular.module('temds.app.controllers')

.controller('DeliveryCreateCtrl', function ($scope, $state, $stateParams, $localstorage, $ionicPopup) {
    var user = $localstorage.getObject('user');
    $scope.addressbook = user.address;

    // retrieve cart obj if available
    $scope.cart = $stateParams.cart;
    if (!$scope.cart) {
        // empty cart obj
        $scope.cart = {
            orders: [],
            deliveryAddress: {}
        };
        // default selected delivery address
        for (var i in $scope.addressbook) {
            if ($scope.addressbook[i].primary) {
                $scope.cart.deliveryAddress = $scope.addressbook[i];
                break;
            }
        }
    }



    /*
        $scope.orders = $localstorage.getObject('orders');
        $scope.selected = $localstorage.getObject('selectedAddress');

        // find primary/default address if there was no selected address
        if (!$scope.selected || Object.keys($scope.selected).length <= 0) {}
    */
    $scope.addOrder = function () {

        // send to confirmation
        $state.go('app.confirm-order', {
            'order': {}
        });
    };

    $scope.editOrder = function (index) {
        $state.go('app.add-order')
    }

    $scope.confirmOrder = function () {
        // TODO: create order
        // send to confirmation
        $state.go('app.confirm-order', {
            'order': order
        });
    }
})

.controller('DeliveryConfirmCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
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


.controller('DeliveryHistoryCtrl', function ($scope, $filter, OrderService) {

})


.controller('DeliveryDetailCtrl', function ($scope, $filter, OrderService) {

});