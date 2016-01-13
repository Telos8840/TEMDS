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

    $scope.deleteOrder = function (index) {
        $scope.delivery.orders.splice(index, 1);
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

.controller('DeliveryConfirmCtrl', function ($scope, $stateParams, $localstorage, DeliveryService) {
    var user = $localstorage.getObject('user');
    $scope.delivery = $stateParams.delivery;

    $scope.createOrder = function () {
        // prepare delivery data
        var delivery = angular.copy($scope.delivery);
        delivery.uId = user.id;
        delivery.status = _ORDER_STATUS_CREATED_;

        for (var i in delivery.orders) {
            delivery.orders[i].vId = delivery.orders[i].venue._id;
            delete delivery.orders[i]["venue"];
        }

        delete delivery.deliveryAddress["primary"];

        DeliveryService.createDelivery(delivery)
            .then(function(response) {
                console.log(response);
            });

        console.log(JSON.stringify(delivery));
        //TODO: Create Post service
    }
})


.controller('DeliveryHistoryCtrl', function ($scope, $filter, $localstorage, DeliveryService) {
    $scope.deliveries = [];
    $scope.page = 1;
    $scope.totalPages = 1;

    /**
     * Refresh data
     */
    $scope.refreshList = function () {
        DeliveryService.getDeliveryHistoryList(1)
            .then(function (data) {
                $scope.totalPages = data.totalPages;
                $scope.deliveries = data.deliveries;
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    /**
     * Attach more data when user scrolls down for more
     */
    $scope.loadMoreData = function () {
        DeliveryService.getDeliveryHistoryList(++$scope.page)
            .then(function (data) {
                $scope.totalPages = data.totalPages;
                $scope.deliveries = $scope.deliveries.concat(data.deliveries);
                $scope.$broadcast('scorll.infiniteScrollComplete');
            });
    };

    /**
     * See if more data can be pulled
     * @returns {Boolean} true if more items can be loaded
     */
    $scope.hasMoreData = function () {
        return $scope.totalPages > $scope.page;
    };

    // Refresh
    $scope.refreshList();
})


.controller('DeliveryDetailCtrl', function ($scope, $filter, DeliveryService) {

});