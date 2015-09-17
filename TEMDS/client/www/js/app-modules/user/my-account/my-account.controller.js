angular.module('temds.app.controllers')


.controller('MyAccountCtrl', function ($scope, $state, $localstorage, MyAccountService, $ionicPopup) {

    $scope.user = $localstorage.getObject('user'); // load user object

    // Init Defaults
    $scope.change = {};
    $scope.showChangePassword = false;

    /**
     * Send put request to change password.
     * On success, close the change password form.
     */
    $scope.changePassword = function () {
        //TODO: save password
        MyAccountService.changePassword($scope.user.id, $scope.change.oldPass, $scope.change.newPass)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $scope.showChangePassword = false;
                    break;
                case 403:
                    $scope.showAlert("Error", "Password does not match!");
                    break;
                default:
                    $scope.showAlert("Error", "Unable to change password!")
                    $scope.showChangePassword = false;
                    break;
                }
                $scope.change = {}; // clear password
            });
    }
    $scope.toggleShowChangePassword = function () {
        $scope.showChangePassword = !$scope.showChangePassword;
    }


    $scope.changePasswordPrompt = function () {
        $scope.change_pass.pass_old = '';
        $scope.change_pass.pass_new = '';
        $scope.valid = false;
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/app/my-account/change-password-popup.html',
            title: 'Change Password',
            subTitle: 'Please verify your current password',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
            },
                {
                    text: '<b>Submit</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        // TODO: Validate form
                        if (!$scope.change_pass.pass_new) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return {
                                pass_new: $scope.change_pass.pass_new,
                                pass_old: $scope.change_pass.pass_old
                            };
                        }
                    }
                }
            ]
        });
        myPopup.then(function (res) {
            if (res) {
                if (res.pass_old.length < 6) {
                    $scope.showAlert("Error", "Current password did not match.");
                } else if (res.pass_new.length < 6) {
                    $scope.showAlert("Error", "New Password must be at least 6 characters.");

                } else {

                    MyAccountService.changePassword(res.pass_old, res.pass_new)
                        .then(function (data) {
                            if (data) {
                                $scope.showAlert("Success", "Your password has been updated.");
                            } else {
                                $scope.showAlert("Error", "Password did not match!");
                            }
                        });
                }
            }
        });

    }

    $scope.addressBookView = function () {
        $state.go('app.address-book');
    }

    $scope.showAlert = function (title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message
        });
    };
});