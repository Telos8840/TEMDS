angular.module('temds.user.controllers')

/* Register Account Controller */
.controller('SignInCtrl', function ($scope, $http, $localstorage, SignInService, $state, $ionicPopup) {
    $scope.user = $localstorage.getObject('user');

    $scope.SignIn = function () {
        SignInService.SignIn($scope.user.email, $scope.user.rawPass)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $state.go('app.my-account');
                    break;
                default:
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Email and Password did not match in our system.'
                    });
                    break;
                }
            });
    }

});