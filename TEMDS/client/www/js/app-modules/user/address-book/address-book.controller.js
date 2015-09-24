angular.module('temds.app.controllers')


.controller('AddressBookCtrl', function ($scope, $state, $localstorage, AddressBookService) {
    $scope.user = $localstorage.getObject('user'); // load user object

    $scope.addressList = [];
    $scope.page = 1;
    $scope.totalPages = 1;

    $scope.refreshData = function () {
        AddressBookService.getAddressList($scope.user.id) // get 1st page
            .then(function (data) {
                $scope.addressList = data;
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.getNewData = function () { // TODO: Not entirely sure what this is for
        //do something to load your new data here
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.loadMoreData = function () {
        $scope.addressList = AddressBookService.loadAddressList();
        $scope.$broadcast('scroll.infiniteScrollComplete');
        /*
        $scope.page += 1;

        AddressBookService.getAddressList($scope.page, $scope.user.id)
            .then(function (data) {
                //We will update this value in every request because new posts can be created
                $scope.totalPages = data.totalPages;
                $scope.addressList = $scope.addressList.concat(data.addressList); // attach n(th) page

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
            */
    };


    $scope.hasMoreData = function () {
        return $scope.totalPages > $scope.page;
    };

    $scope.refreshData();

    /**
     * Go to address edit form to create new or edit existing address.
     * @param {Object?} address Address Object.
     */
    $scope.editAddress = function (address) {
        $state.go('app.address-book-set', {
            'address': (address ? address : {})
        });
    }

    /**
     * Toggle on/off primary address. If primary address is set to true, 
     * rest are set to false. Ignore toggle if already set true.
     * @param {Object} address [[Description]]
     */
    $scope.togglePrimaryAddress = function (address) {
        if (!address.primary) {
            for (var i in $scope.addressList) {
                $scope.addressList[i].primary = $scope.addressList[i].id == address.id;
            }
        }
        // TODO: Send POST to update list
    }
})

.controller('AddressBookEditCtrl', function ($scope, $state, $localstorage, $ionicHistory, $ionicPopup, $stateParams, AddressBookService) {
    $scope.statelist = _US_STATES_;
    $scope.edit = {
        address: {
            primary: false,
            state: {
                abbr: 'AL'
            }
        }
    };

    if ($stateParams.address) {
        $scope.edit.address = angular.copy($stateParams.address);
        $scope.edit.address.state = {
            abbr: $scope.edit.address.state
        };
    }

    $scope.edit.allowEditPrimary = false;
    if ($scope.edit.address && $scope.edit.address.id) {
        $scope.edit.allowEditPrimary = !$scope.edit.address.primary; // only if this address isn't primary
        $scope.edit.title = "Edit Address";
        $scope.edit.submit = "Update";
    } else {
        $scope.edit.allowEditPrimary = true;
        $scope.edit.title = "New Address";
        $scope.edit.submit = "Create";
    }

    /**
     * Add or Modify address
     */
    $scope.setAddress = function () {
        $stateParams.address = $scope.edit.address;
        $stateParams.address.state = $scope.edit.address.state.abbr;
        if ($stateParams.address.id) {
            AddressBookService.updateAddress($stateParams.address)
                .then(function (data) {
                    if (data === _SUCCESS_) {
                        $ionicHistory.goBack(-1);
                    } else {
                        $ionicPopup.alert({
                            title: 'Error',
                            content: 'Unable to update address.'
                        });
                    }
                });
        } else {
            AddressBookService.addAddress($stateParams.address)
                .then(function (data) {
                    if (data === _SUCCESS_) {
                        $ionicHistory.goBack(-1);
                    } else {
                        $ionicPopup.alert({
                            title: 'Error',
                            content: 'Unable to add address.'
                        });
                    }
                });
        }

    }

    $scope.goBack = function () {
        $ionicHistory.goBack(-1);
    }
});