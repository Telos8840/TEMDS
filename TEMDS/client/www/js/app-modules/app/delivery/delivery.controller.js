angular.module('temds.app.controllers')

.controller('DeliveryCreateCtrl', function ($scope, $state, $stateParams, $localstorage, $ionicPopup, $ionicHistory) {
    var user = $localstorage.getObject('user');
    $scope.addressbook = user.address;
    $scope.showDelete = false;
    $scope.delivery = $localstorage.getObject('delivery');

    if (isEmpty($scope.delivery)) {
        // empty delivery obj
        $scope.delivery = {
            orders: [
                /* TEMP DATA */
                {
                    venue: {
                        name: 'Hello World',
                        thumbnail: 'http://lorempixel.com/50/50/fashion/TEMDS-0'
                    }
                }
            ],
            deliveryAddress: {}
        };
        // default selected delivery address
        for (var i in $scope.addressbook) {
            if ($scope.addressbook[i].primary) {
                $scope.delivery.deliveryAddress = $scope.addressbook[i];
                break;
            }
        }
    } else {
        for (var i in $scope.addressbook) {
            if ($scope.addressbook[i].name == $scope.delivery.deliveryAddress.name) {
                $scope.delivery.deliveryAddress = $scope.addressbook[i];
                break;
            }
        }
    }

    // Change state event
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'app.delivery-create' && fromState.name === 'app.order-create') {
            // retrieve order object to add or edit
            if (toParams.order) {
                var index = toParams.index;
                if (index < 0 || index >= $scope.delivery.orders.length) {
                    $scope.delivery.orders.push(toParams.order);
                } else {
                    $scope.delivery.orders[index] = toParams.order;
                }
                $localstorage.setObject('delivery', $scope.delivery);
                $ionicHistory.clearCache();
            }
        }
    });

    $scope.addOrder = function () {
        $localstorage.setObject('delivery', $scope.delivery);
        $state.go('app.order-create', {
            order: null,
            index: -1
        });
    };

    $scope.deleteOrder = function (item) {
        $scope.delivery.orders.splice($scope.delivery.orders.indexOf(item), 1);
        $localstorage.setObject('delivery', $scope.delivery);
    };

    $scope.editOrder = function (index) {
        $localstorage.setObject('delivery', $scope.delivery);
        $state.go('app.order-create', {
            order: $scope.delivery.orders[index],
            index: index
        });
    };

    $scope.confirmDelivery = function () {
        //TODO: Verify delivery object
        // send to confirmation
        $state.go('app.delivery-confirm', {
            delivery: $scope.delivery
        });
    };

    $ionicHistory.clearCache();
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