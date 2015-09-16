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