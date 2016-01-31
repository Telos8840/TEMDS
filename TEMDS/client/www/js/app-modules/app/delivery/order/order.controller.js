angular.module('temds.app.controllers')

    .controller('OrderCreateCtrl', function ($scope, $rootScope, $state, $ionicViewSwitcher, $stateParams, $localstorage, $ionicPopup, $ionicHistory, OrderService, VenueService) {
        $scope.showDelete = false;

        // Retrieve selcted venue if coming from venue detail
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name === 'app.order-create') {
                if (fromState.name === 'app.venue-detail') {
                    $scope.index = toParams.index;
                    if (!$scope.order) {
                        $scope.order = {
                            venue: null,
                            items: [
                                {
                                    description: ''
                                }
                            ],
                            comment: ''
                        };
                    }
                    $scope.order.venue = fromParams.venue;
                } else if (fromState.name === 'app.delivery-create') {
                    $scope.order = toParams.order;
                    $scope.index = toParams.index;
                    // Retrieve or create order object to edit/create
                    if (!$scope.order) {
                        $scope.order = {
                            venue: null,
                            items: [
                                {
                                    description: ''
                                }
                            ],
                            comment: ''
                        };
                    }
                }
            }
        });

        /**
         * Custom Back Button route
         * Always reset to default back route when leaving this view.
         * rootScope is global and will set all back route.
         * @type {Function|$rootScope.$ionicGoBack}
         */
        var oldSoftBack = $rootScope.$ionicGoBack;
        $rootScope.$ionicGoBack = function () {
            $rootScope.$ionicGoBack = oldSoftBack;
            // send order to delivery create view
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $ionicViewSwitcher.nextDirection('back');
            $state.go('app.delivery-create', {
                order: null,
                index: -1
            });
        }

        /**
         * Display Venue list and allow user to select.
         * Order object is passed to assign venue and must
         * come back to this controller when venue is selected.
         */
        $scope.venuePicker = function () {
            $rootScope.$ionicGoBack = oldSoftBack;
            $state.go('app.venue-list', {
                order: $scope.order
            });
        }

        /**
         * Delete Item at %i%
         * @param {Number} i index of item
         */
        $scope.deleteItemAt = function (i) {
            $scope.order.items.splice(i, 1);
        };

        /**
         * Add new item at the end of the list
         */
        $scope.addItem = function () {
            $scope.order.items.push({
                description: ''
            });
        }

        /**
         * Go to order confirm view.
         * Create order object here.
         */
        $scope.confirmOrder = function () {
            // prepare order items
            for (var i = $scope.order.items.length - 1; i >= 0; i--) {
                if ($scope.order.items[i].description.trim() == '') {
                    $scope.order.items.splice(i, 1);
                }
            }
            // Invalid order alert
            if (!$scope.order.venue) {
                $ionicPopup.alert({
                    title: 'Venue Missing',
                    content: 'You must select a venue to create order from. Please tap on venue card to proceed.'
                });
            } else if ($scope.order.items.length <= 0) {
                $ionicPopup.alert({
                    title: 'Item Missing',
                    content: 'There is no item in this order. Please add at least one item to create an order.'
                });
            } else {
                // send order to delivery create view
                $ionicViewSwitcher.nextDirection('back');
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $rootScope.$ionicGoBack = oldSoftBack;
                $state.go('app.delivery-create', {
                    index: $scope.index,
                    order: $scope.order
                });
            }
        };
    });