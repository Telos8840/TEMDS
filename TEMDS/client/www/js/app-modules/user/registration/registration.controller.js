angular.module('temds.user.controllers')

/* Register Account Controller */
.controller('RegisterAccountCtrl', function ($scope, $http, RegisterService, $state, $ionicPopup, $interval, $stateParams, $ionicHistory) {
    $scope.user = {};

    if ($stateParams.email)
        $scope.user.email = $stateParams.email;

    $scope.sendConfirmText = "Send Confirmation Email";
    $scope.timerInvalid = false;
    $scope.statelist = _US_STATES_;

    var sendConfirmTimer, sendConfirmTime = 0;

    $scope.resetTimer = function () {
        $interval.cancel(sendConfirmTimer);
        sendConfirmTimer = undefined;
        $scope.timerInvalid = false;
        $scope.sendConfirmText = "Send Confirmation Email";
    }

    /**
     * Send an email to user with confirmation number.
     * Confirmation number is used to validate user's email.
     * On submit, countdown is placed to prevent multiple/spam
     * submition. 
     */
    $scope.sendEmailConfirmation = function () {
        // Start spam proof timer
        sendConfirmTime = 120;
        $scope.timerInvalid = true;
        $scope.sendConfirmText = "Please wait " + sendConfirmTime + " seconds...";

        sendConfirmTimer = $interval(function () {
            if (sendConfirmTime <= 1) {
                $scope.resetTimer();
            } else {
                $scope.sendConfirmText = "Please wait " + (--sendConfirmTime) + " seconds..."
            }
        }, 1000);

        // Send email confirmation
        RegisterService.sendEmailConfirmation($scope.user.email)
            .then(function (data) {
                switch (data) {
                case _SUCCESS_:
                    $ionicPopup.alert({
                        title: 'Confirmaion Sent',
                        content: 'Email has been sent to ' + $scope.user.email +
                            ' with five digit confirmation numbers.'
                    }).then(function () {});
                    break;
                case 400:
                    // Display Error
                    $ionicPopup.alert({
                        title: 'Invalid Email',
                        content: $scope.user.email + ' is already in our database.'
                    }).then(function () {
                        console.log("TODO: sendEmailConfirmation - send to password recovery view.")
                    });
                    $scope.resetTimer();
                    break;
                default:
                    // Display Error
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'We were unable to send a confirmation email to ' +
                            $scope.user.email + '. Please contact the administrator.'
                    });
                    $scope.resetTimer();
                }
            });
    };

    /**
     * Check email confirmation number.
     * Returns true on valid confirmation number.
     */
    $scope.checkConfirmation = function () {
        RegisterService.checkEmailConfirmation($scope.user.email, $scope.user.confirmNum)
            .then(function (data) {
                if (data) {
                    $state.go('register-form', {
                        email: $scope.user.email
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Invalid Confirmation',
                        content: 'Please check your confirmation number.'
                    });
                }
            });
    };

    /**
     * Register new user.
     * user object should contain:
     *     email, rawPass, fName, lName, phoneNum, bDay, and address object.
     *     address object should contain:
     *         name, addr1, addr2, city, state, zipcode, and primary
     */
    $scope.registerNewUser = function () {
        RegisterService.registerNewUser($scope.user)
            .then(function (data) {
                if (data) {
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'Worked!'
                    });
                    console.log(RegisterService.LocalStorageUser());
                } else {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Unable to create new user. Please contact the administrator.'
                    });
                }
            });
    }

    /**
     * Go to splash/intro view without adding a back button.
     */
    $scope.gotoSplash = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go('splash-page');
    }
})