angular.module('temds.welcome.controllers')

    .controller('IntroCtrl', function ($scope, $state, $ionicModal) {
        // $scope.bgs = ["http://lorempixel.com/640/1136"];
        $scope.bgs = ["img/background/bg.png"];

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
        $scope.bgs = ["img/background/bg.png"];
        $scope.user = $localstorage.getObject('user');

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        // ReAuthentication
        SignInService.ReAuth()
            .then(function (data) {
                if (data == _SUCCESS_) {
                    // TODO: If we ever create a main view, let's go there.
                    $state.go('app.my-account');
                } else {
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true
                    });
                    $state.go('intro');
                }
            });
    });