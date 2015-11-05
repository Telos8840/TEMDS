angular.module('temds.app.controllers')

.controller('DeliveryCreateCtrl', function ($scope, $state, $stateParams, $localstorage, $ionicPopup, $ionicViewService) {
    var user = $localstorage.getObject('user');
    $scope.addressbook = user.address;

    // retrieve delivery obj if available
    $scope.delivery = $stateParams.delivery;
    if (!$scope.delivery) {
        // empty delivery obj
        $scope.delivery = {
            orders: [],
            deliveryAddress: {}
        };
        // default selected delivery address
        for (var i in $scope.addressbook) {
            if ($scope.addressbook[i].primary) {
                $scope.delivery.deliveryAddress = $scope.addressbook[i];
                break;
            }
        }
    }

    $scope.addOrder = function () {
        $state.go('app.order-create', {
            order: $scope.delivery,
            index: -1
        });
    };

    $scope.editOrder = function (index) {
        // send to confirmation
        $state.go('app.order-create', {
            order: $scope.delivery,
            index: index
        });
    };

    $scope.confirmOrder = function () {
        // TODO: create order
        // send to confirmation
        $state.go('app.confirm-order', {
            'order': order
        });
    };

    $ionicViewService.clearHistory();
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