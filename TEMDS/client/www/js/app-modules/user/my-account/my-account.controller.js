angular.module('temds.app.controllers')


.controller('MyAccountCtrl', function ($scope, $state, $localstorage, MyAccountService, $ionicPopup, $ionicModal) {
    // Init Defaults
    $scope.user = $localstorage.getObject('user'); // load user object
    $scope.showChangePassword = $scope.showChangeName = false;
    $scope.showChange = [false, false, false];
    $scope.change = {};

    // Phonenumber auto formatter
    $scope.$watch('change.phoneNum',
        function (value) {
            var p = PHONE_NUMBER_FORMATTER(value);
            $scope.change.phoneNum = p.phoneNum;
            $scope.phoneNumIsValid = p.valid;
        }
    );

    /**
     * Send put request to change password.
     * On success, close the password drawer and update localstorage.user
     */
    $scope.changePassword = function () {
        //TODO: save password
        MyAccountService.changePassword($scope.user.id, $scope.change.oldPass, $scope.change.newPass)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $scope.showChange[0] = false;
                    break;
                case 403:
                    $scope.showAlert("Error", "Password does not match!");
                    break;
                default:
                    $scope.showAlert("Error", "Unable to change password!")
                    $scope.showChange[0] = false;
                    break;
                }
                $scope.change = {}; // clear password
            });
    }

    /**
     * Send put request to change user's firstname and lastname.
     * On success, close the name drawer and update localstorage.user
     */
    $scope.changeName = function () {
        MyAccountService.changeName($scope.user.id, $scope.change.fName, $scope.change.lName)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $scope.user.fName = $scope.change.fName;
                    $scope.user.lName = $scope.change.lName;
                    $localstorage.setObject('user', $scope.user);
                    break;
                default:
                    $scope.showAlert("Error", "Unable to change name! Please contact the administrator.");
                    break;
                }
                $scope.showChange[1] = false;
            });
    }

    /**
     * Send put request to change user's phone number.
     * On success, close the phone number drawer and update localstorage.user
     */
    $scope.changePhoneNum = function () {
        MyAccountService.changePhoneNum($scope.user.id, $scope.change.phoneNum)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $scope.user.phoneNum = $scope.change.phoneNum;
                    $localstorage.setObject('user', $scope.user);
                    break;
                default:
                    $scope.showAlert("Error", "Unable to change phone number! Please contact the administrator.");
                    break;
                }
                $scope.showChange[2] = false;
            });
    }

    /**
     * Delete local storage and go back to splash page.
     */
    $scope.signOut = function () {
        $localstorage.set('user', '');
        $state.go('splash');
    }

    /**
     * Toggle show flag for change drawers.
     * If a case of open drawer, close the others.
     * @param {Number} index Index of change drawer.
     */
    $scope.toggleShowChange = function (index) {
        if (index < $scope.showChange.length) {
            if (!$scope.showChange[index]) {
                for (var i = 0; i < $scope.showChange.length; i++)
                    $scope.showChange[i] = i === index;
            } else $scope.showChange[index] = false;
        }
        if ($scope.showChange[index]) {
            $scope.change = {
                fName: $scope.user.fName,
                lName: $scope.user.lName
            }
        }
        return $scope.showChange[index];
    }


    /**
     * Redirect to Address Book View
     */
    $scope.addressBookView = function () {
        $state.go('app.address-book');
    }

    /**
     * Display Alert popup
     * @param {String} title   Popup Title
     * @param {String} message Message Content
     */
    $scope.showAlert = function (title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message
        });
    };



    $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.terms_of_service_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.privacy_policy_modal = modal;
    });

    $scope.showTerms = function () {
        $scope.terms_of_service_modal.show();
    };

    $scope.showPrivacyPolicy = function () {
        $scope.privacy_policy_modal.show();
    };

    /* NOT USED
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

    }*/
});