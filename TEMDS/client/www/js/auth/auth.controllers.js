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
.controller('RegisterAccountCtrl', function ($scope, RegisterService, $state, $ionicPopup, $interval) {
    $scope.user = {};
    $scope.sendConfirmText = "Send Confirmation Email";
    $scope.timerInvalid = false;

    var sendConfirmTimer, sendConfirmTime = 0;

    $scope.sendEmailConfirmation = function () {
        RegisterService.sendRegisterEmailConfirmation($scope.user.email)
            .then(function (data) {
                if (data.startsWith('success')) {
                    $ionicPopup.alert({
                        title: 'Confirmaion Sent',
                        content: 'Email has been sent to ' + $scope.user.email 
                                + ' with five digit confirmation numbers.'
                    }).then(function () {
                        // set timer to limit spam calls
                        sendConfirmTime = 120;
                        $scope.timerInvalid = true;
                        $scope.sendConfirmText = "Please wait " + sendConfirmTime + " seconds..."

                        sendConfirmTimer = $interval(function () {
                            if (sendConfirmTime <= 1) {
                                $interval.cancel(sendConfirmTimer);
                                sendConfirmTimer = undefined;
                                $scope.sendConfirmText = "Send Confirmation Email";
                                $scope.timerInvalid = false;
                            } else {
                                $scope.sendConfirmText = "Please wait " + (--sendConfirmTime)
                                                        + " seconds..."
                            }
                        }, 1000);
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: data
                    });
                }
            });
    };

    $scope.checkConfirmation = function () {
        //TODO: CHECK CONFIRMATION NUMBER
        $ionicPopup.alert({
            title: 'Email Confirmed',
            content: $scope.user.confirmNum + ' matched with email, ' // temp msg....
                + $scope.user.email + "!"
        }).then(function () {
            $state.go('register-form');
        });
    };
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