angular.module('temds.app.controllers')

    .controller('DeliveryCreateCtrl', function ($scope, $state, $localstorage, $ionicPopup, $ionicHistory) {
        var user = $localstorage.getObject('user');
        $scope.addressbook = user.address;
        $scope.showDelete = false;
        $scope.delivery = $localstorage.getObject('delivery');

        if (isEmpty($scope.delivery)) {
            // empty delivery obj
            $scope.delivery = {
                recipient: (user.fName + ' ' + user.lName).trim(),
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

        /**
         * Delivery object validity
         * @returns {*|boolean}
         */
        $scope.isValidDeliveryOrder = function() {
            return  $scope.delivery &&
                $scope.delivery.orders &&
                $scope.delivery.orders.length > 0;
        };

        /**
         * Go to confirm delivery order view
         * after validating the data.
         */
        $scope.confirmDelivery = function () {
            if ($scope.isValidDeliveryOrder()) {
                // Force recipient name to user if empty
                if ($scope.delivery.recipient.trim() === '')
                    $scope.delivery.recipient = user.fName + ' ' + user.lName;

                $state.go('app.delivery-confirm', {
                    delivery: $scope.delivery
                });
            } else {
                $ionicPopup.alert({
                    title: 'Empty Order',
                    template: 'Please add an order to proceed'
                });
            }
        };

        $ionicHistory.clearCache();
    })

    .controller('DeliveryConfirmCtrl', function ($scope, $state, $stateParams, $localstorage, $ionicPopup, $ionicHistory, DeliveryService) {
        var user = $localstorage.getObject('user');
        $scope.delivery = $stateParams.delivery;

        $scope.createOrder = function () {
            // prepare delivery data
            var delivery = angular.copy($scope.delivery);
            delivery.uId = user.id;
            delivery.status = _ORDER_STATUS_CREATED_;
            

            delete delivery.deliveryAddress["primary"];

            DeliveryService.createDelivery(delivery)
                .then(function(response) {
                    // TODO: Instead of POPUP, direct to detail with a flag to show 'SUCCESS Banner'
                    $ionicPopup.alert({
                        title: 'Delivery Created',
                        template: 'Order was successfully created!\n'+
                        'Confirmation #'+response.confirmationNumber
                    }).then(function() {
                        $scope.delivery = {};
                        $stateParams.delivery = {};
                        $localstorage.setObject('delivery', {});
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go('app.delivery-detail', {
                            deliveryId: response.id
                        });
                        //console.log('goto delivery detail view!\nid: '+response.id+'\n#'+response.confirmationNumber);
                    });
                });
        }
    })


    .controller('DeliveryHistoryCtrl', function ($scope, $state, $ionicHistory, DeliveryService) {
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
                    $scope.deliveries = data.items;
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
                    $scope.deliveries = $scope.deliveries.concat(data.items);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };

        /**
         * See if more data can be pulled
         * @returns {Boolean} true if more items can be loaded
         */
        $scope.hasMoreData = function () {
            return $scope.totalPages > $scope.page;
        };

        $scope.createdDate = function(datestring) {
            return moment(datestring).format('MM/DD/YYYY');
        };

        // TODO: Use order.scss colors
        $scope.getStatus = function(statusCode) {
            var status = {};
            switch(parseInt(statusCode)) {
                case _ORDER_STATUS_CREATED_:
                    status.text = 'Processing';
                    status.bgColor = '#36506C';
                    break;
                case _ORDER_STATUS_PROCESSING_:
                    status.text = 'Processing';
                    status.bgColor = '#3F6C49';
                    break;
                case _ORDER_STATUS_DELIVERY_IN_PROGRESS_:
                    status.text = 'Out for delivery';
                    status.bgColor = '#AACCFF';
                    break;
                case _ORDER_STATUS_DELIVERED_:
                    status.text = "Delivered";
                    status.bgColor = '#00CC00';
                    break;
                case _ORDER_STATUS_DENIED_:
                    status.text = "Declined";
                    status.bgColor = '#777777';
                    break;
                case _ORDER_STATUS_CANCELLED_:
                    status.text = "Canceled";
                    status.bgColor = '#CD0000';
                    break;
                case _ORDER_STATUS_ON_HOLD:
                    status.text = "On hold";
                    status.bgColor = '#BEBE00';
                    break;
            }
            return status;
        };

        // Refresh
        $scope.refreshList();
    })


    .controller('DeliveryDetailCtrl', function ($scope, $stateParams, $ionicPopup, DeliveryService) {
        var updateTime = 30000;
        var deliveryId = $stateParams.deliveryId;
        $scope.delivery = {};
        $scope.status = {
            statusMessage: '',
            statusAlertBarWidth: 0,
            statusPos: -1,
            statusBar: 0,
            setAlert: false,
            alertMessage: '',
            alertBG: '',
            canCancel: false
        };

        //clearTimeout(timeoutVariable);


        function updateStatus() {
            DeliveryService.getDeliveryStatus(deliveryId)
                .then(function(data) {
                    setStatus(data);
                    setTimeout(updateStatus, updateTime);
                });
        }

        DeliveryService.getDeliveryDetail(deliveryId)
            .then(function(data) {
                $scope.delivery = data;
                $scope.delivery.createdDate = moment($scope.delivery.insertDate).format('MM/DD/YYYY');
                setStatus($scope.delivery.status);
                updateStatus();
            });

        function setStatus(statusCode) {
            $scope.status.canCancel = false;

            switch(parseInt(statusCode)) {
                case _ORDER_STATUS_CREATED_:
                    $scope.status.statusMessage = "Order created";
                    $scope.status.statusBar = 0;
                    $scope.status.statusPos = 0;
                    $scope.status.setAlert = false;
                    $scope.status.canCancel = true;
                    break;
                case _ORDER_STATUS_PROCESSING_:
                    $scope.status.statusMessage = "Order is being processed";
                    $scope.status.statusBar = 100.0*(1/3);
                    $scope.status.statusPos = 1;
                    $scope.status.setAlert = false;
                    $scope.status.canCancel = true;
                    break;
                case _ORDER_STATUS_DELIVERY_IN_PROGRESS_:
                    $scope.status.statusMessage = "Order is being delivered";
                    $scope.status.statusBar = 100.0*(2/3);
                    $scope.status.statusPos = 2;
                    $scope.status.setAlert = false;
                    break;
                case _ORDER_STATUS_DELIVERED_:
                    $scope.status.statusMessage = "Order is delivered";
                    $scope.status.statusBar = 100;
                    $scope.status.statusPos = 3;
                    $scope.status.setAlert = false;
                    break;
                case _ORDER_STATUS_DENIED_:
                    $scope.status.statusMessage = "Order was declined";
                    $scope.status.alertMessage = 'DECLINED';
                    $scope.status.setAlert = true;
                    $scope.status.alertBG = 'declined';
                    break;
                case _ORDER_STATUS_CANCELLED_:
                    $scope.status.statusMessage = "Order was canceled";
                    $scope.status.setAlert = true;
                    $scope.status.alertMessage = 'CANCELED';
                    $scope.status.alertBG = 'canceled';
                    break;
                case _ORDER_STATUS_ON_HOLD:
                    $scope.status.statusMessage = "Order needs a follow up";
                    $scope.status.alertMessage = 'NEES FOLLOW UP';
                    $scope.status.setAlert = true;
                    $scope.status.alertBG = 'warning';
                    break;
            }
        }

        $scope.isActivated = function(index) {
            return $scope.status.statusPos > index;
        };
        $scope.isActivate = function(index) {
            return $scope.status.statusPos == index && !$scope.status.setAlert;
        };

        $scope.cancelDelivery = function() {
            $ionicPopup.confirm({
                title: 'Cancel Delivery Order',
                template: 'Do you wish to cancel Order #'+$scope.delivery.confirmationNumber+'?'
            }).then(function(res) {
                if (res) {
                    DeliveryService.cancelDelivery($scope.delivery._id)
                        .then(function(data) {
                            if (data == _SUCCESS_) {
                                $ionicPopup.alert({
                                    title: 'Delivery Order Canceled',
                                    template: 'Your order has been canceled successfully.'
                                });
                                setStatus(_ORDER_STATUS_CANCELLED_);
                            } else {
                                $ionicPopup.alert({
                                    title: 'Request Failed',
                                    template: 'Your order cannot be canceled.'
                                });
                                //TODO: udpate status
                            }
                        });
                }
            })
        };
    });