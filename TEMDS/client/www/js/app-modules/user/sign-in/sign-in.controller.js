angular.module('temds.user.controllers')

/* Register Account Controller */
.controller('SignInCtrl', function ($scope, $http, $localstorage, $ionicModal, $state, $ionicPopup, SignInService, MyAccountService) {
    $scope.user = $localstorage.getObject('user');

    $ionicModal.fromTemplateUrl('views/auth/recover-password.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.recoverPasswordModal = modal
    });

    $scope.recover = {
        email: ''
    };
    $scope.showRecoverPassword = function () {
        $scope.recover.email = '';
        $scope.recoverPasswordModal.show();
    }

    /**
     * Sign-In to TEMDS
     */
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

    /**
     * Send new password to email
     */
    $scope.RecoverPassword = function () {
        MyAccountService.recoverPassword($scope.recover.email)
            .then(function (data) {
                if (data === _SUCCESS_) {
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'We have sent you a temporary password to "' +
                            $scope.recover.email + '".'
                    }).then(function () {
                        $scope.recoverPasswordModal.hide();
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Password recovery failed.'
                    }).then(function () {
                        $scope.error = data;
                    });
                }
            });
    }
});