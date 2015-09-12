angular.module('temds.app.controllers')


.controller('AddressBookCtrl', function ($scope, $state, AddressBookService) {
    $scope.addressList = [];
    $scope.page = 1;
    $scope.totalPages = 1;

    $scope.refreshData = function () {
        AddressBookService.getAddressList(1) // get 1st page
            .then(function (data) {
                $scope.totalPages = data.totalPages;
                $scope.addressList = data.addressList;
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.getNewData = function () { // TODO: Not entirely sure what this is for
        //do something to load your new data here
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.loadMoreData = function () {
        $scope.page += 1;

        AddressBookService.getAddressList($scope.page)
            .then(function (data) {
                //We will update this value in every request because new posts can be created
                $scope.totalPages = data.totalPages;
                $scope.addressList = $scope.addressList.concat(data.addressList); // attach n(th) page

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };


    $scope.hasMoreData = function () {
        return $scope.totalPages > $scope.page;
    };

    $scope.refreshData();

    /**
     * Go to address detail view.
     * @param {Object?} address Address Object.
     */
    $scope.addressDetail = function (address) {
        address = address ? address : {};
        console.log(address);
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
});