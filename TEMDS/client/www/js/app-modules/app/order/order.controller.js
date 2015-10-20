angular.module('temds.app.controllers')


.controller('CreateOrderCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
    var venueId = $stateParams.venueId;
})


.controller('ConfirmOrderCtrl', function ($scope, $stateParams, $localstorage, OrderService) {
    var venueId = $stateParams.venueId;
})


.controller('OrderHistoryCtrl', function ($scope, $filter, OrderService) {

})


.controller('OrderDetailCtrl', function ($scope, $filter, OrderService) {

});