angular.module('temds.auth.controllers', [])


.controller('WelcomeCtrl', function ($scope, $state, $ionicModal) {
    // $scope.bgs = ["http://lorempixel.com/640/1136"];
    $scope.bgs = ["img/welcome-bg.jpeg"];

    /// Sign In button is pressed
    /// Goto Sign In View
    $scope.signInForm = function () {
        console.log("display sign-in form");
        $state.go('sign-in');
    }

    $scope.signUp = function () {
        /// <summary>
        /// Open new user registration step 1: Email Confirmation Form
        /// </summary>
        $state.go('email-confirm');
    }

    /* keeping for reference use
    $scope.facebookSignIn = function () {
      console.log("doing facebbok sign in");
      $state.go('app.feed');
    }; */

    $ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.privacy_policy_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.terms_of_service_modal = modal;
    });

    $scope.showPrivacyPolicy = function () {
        $scope.privacy_policy_modal.show();
    };

    $scope.showTerms = function () {
        $scope.terms_of_service_modal.show();
    };
})

/* Register Account Controller */
.controller('RegisterAccountCtrl', function ($scope, $http, RegisterService, $state, $ionicPopup, $interval, $stateParams, $ionicHistory) {
    $scope.user = {};

    if ($stateParams.email)
        $scope.user.email = $stateParams.email;

    $scope.sendConfirmText = "Send Confirmation Email";
    $scope.timerInvalid = false;
    $scope.statelist = _US_STATES_;

    var sendConfirmTimer, sendConfirmTime = 0;

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
                $interval.cancel(sendConfirmTimer);
                sendConfirmTimer = undefined;
                $scope.sendConfirmText = "Send Confirmation Email";
                $scope.timerInvalid = false;
            } else {
                $scope.sendConfirmText = "Please wait " + (--sendConfirmTime) + " seconds..."
            }
        }, 1000);

        // Send email confirmation
        RegisterService.sendEmailConfirmation($scope.user.email)
            .then(function (data) {
                if (data) {
                    $ionicPopup.alert({
                        title: 'Confirmaion Sent',
                        content: 'Email has been sent to ' + $scope.user.email +
                            ' with five digit confirmation numbers.'
                    }).then(function () {});
                } else {
                    // Stop Timer on Error
                    if (sendConfirmTimer) {
                        $interval.cancel(sendConfirmTimer);
                        sendConfirmTimer = undefined;
                        $scope.timerInvalid = false;
                        $scope.sendConfirmText = "Send Confirmation Email";
                    }

                    // Display Error
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'We were unable to send a confirmation email to ' +
                            $scope.user.email + '. Please contact the administrator.'
                    });
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

    $scope.registerNewUser = function () {
        RegisterService.registerNewUser(
            $scope.user.email,
            $scope.user.password,
            $scope.user.fname,
            $scope.user.lname,
            $scope.user.phone,
            $scope.user.address.addr1,
            $scope.user.address.addr2,
            $scope.user.address.city,
            $scope.user.address.state,
            $scope.user.address.zipcode
        ).then(function (data) {
            if (data) {
                // TODO: Go somewhere
                // $state.go('');
            } else {
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'Unable to create new user. Please contact the administrator.'
                });
            }
        })
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

.controller('WelcomeBackCtrl', function ($scope, $state, $ionicModal) {
    $scope.doLogIn = function () {
        console.log("doing log in");
        $state.go('app.feed');
    };

    $ionicModal.fromTemplateUrl('views/auth/forgot-password.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.forgot_password_modal = modal;
    });

    $scope.showForgotPassword = function () {
        $scope.forgot_password_modal.show();
    };

    $scope.requestNewPassword = function () {
        console.log("requesting new password");
    };

    // //Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //   $scope.modal.remove();
    // });
    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //   // Execute action
    // });
    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //   // Execute action
    // });
})

.controller('ForgotPasswordCtrl', function ($scope) {

})

;