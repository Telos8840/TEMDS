angular.module('temds.welcome.controllers')

.controller('SplashCtrl', function ($scope, $state, $ionicModal, $localstorage, SignInService) {
    $scope.user = $localstorage.getObject('user');

    // ReAuthentication
    if ($scope.user.saltPass && $scope.user.id) {
        SignInService.ReAuth($scope.user.id, $scope.user.saltPass)
            .then(function (data) {
                if (data == _SUCCESS_)
                    $state.go('app.my-account');
            });
    }

    // $scope.bgs = ["http://lorempixel.com/640/1136"];
    $scope.bgs = ["img/welcome-bg.jpeg"];

    /// Sign In button is pressed
    /// Goto Sign In View
    $scope.signIn = function () {
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