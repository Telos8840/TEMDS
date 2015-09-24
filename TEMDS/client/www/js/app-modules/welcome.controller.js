angular.module('temds.welcome.controllers')

.controller('IntroCtrl', function ($scope, $state, $ionicModal) {
    // $scope.bgs = ["http://lorempixel.com/640/1136"];
    $scope.bgs = ["img/splash-bg.jpeg"];

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


.controller('SplashCtrl', function ($scope, $state, $ionicModal, $localstorage, $ionicHistory, SignInService) {
    var bgImgs = ["welcome-bg.jpeg", "welcome2-bg.jpeg", "welcome3-bg.jpeg"];
    $scope.bgs = ["img/" + bgImgs[Math.floor(Math.random() * bgImgs.length)]];
    $scope.user = $localstorage.getObject('user');

    $ionicHistory.nextViewOptions({
        disableBack: true
    });

    // ReAuthentication
    if ($scope.user.saltPass && $scope.user.id) {
        SignInService.ReAuth($scope.user.id, $scope.user.saltPass)
            .then(function (data) {
                if (data == _SUCCESS_) $state.go('app.my-account');
                else $state.go('intro');
            });
    } else $state.go('intro');
});