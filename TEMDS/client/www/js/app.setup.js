angular.module('underscore', [])
    .factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    });

angular.module('temds', [
    'ionic',
    'temds.common.directives',
    'uiGmapgoogle-maps',

    /* Utils */
    'temds.utils.controllers',

    /* Welcome */
    'temds.welcome.controllers',

    /* Main Application */ //NOTE: used for reference.
    'temds.app.controllers',
    'temds.app.services',

    /* User Registration */
    'temds.user.controllers',
    'temds.user.services',

    /* Authentication */
    'temds.auth.controllers',

    'temds.views',
    'underscore',
    'angularMoment',
    'ngAnimate',

    /* iOS 9 Patch (https://gist.github.com/IgorMinar/863acd413e3925bf282c) */
    'ngIOS9UIWebViewPatch'
])

// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
    .config(function ($ionicConfigProvider, $httpProvider) {
        if (ionic.Platform.isAndroid()) {
            $ionicConfigProvider.scrolling.jsScrolling(false);
        }
        // back button text always displays 'Back'
        $ionicConfigProvider.backButton.previousTitleText(false);

        // HTTP Interceptors
        $httpProvider.interceptors.push(function ($q, $rootScope, $localstorage, $injector) {
            return {
                request: function (config) {
                    //console.log(config);
                    // spinner filter
                    if (config.url.indexOf('api/delivery/getStatus') == -1) {
                        $rootScope.$broadcast('loading:show');
                    }
                    config.headers.temdstoken = $localstorage.get('temdstoken');
                    return config;
                },
                requestError: function (rejection) {
                    $rootScope.$broadcast('loading:hide');
                    return $q.reject(rejection);
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.$broadcast('loading:hide');

                    if (rejection.status == 401) {
                        // Token Expired Handler
                        var signInService = $injector.get('SignInService');
                        return signInService.ReAuth()
                            .then(function(data) {
                            if(data == _SUCCESS_) {
                                var $http = $injector.get('$http');
                                return $http(rejection.config);
                            } else {
                                $ionicHistory.nextViewOptions({
                                    disableAnimate: true
                                });

                                $state.go('intro');
                            }
                        });
                    }

                    return $q.reject(rejection);
                }
            };
        });
    })

    .run(function ($ionicPlatform, $rootScope, $ionicHistory, $ionicLoading) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        // HTTP Interceptors
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            //SIDE MENU ROUTES
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/app/side-menu.html',
                controller: 'SideMenuCtrl'
            })

            .state('app.feed', {
                url: '/feed',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/feed.html',
                        controller: 'FeedCtrl'
                    }
                }
            })

            .state('app.profile', {
                abstract: true,
                url: '/profile/:userId',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/profile/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.profile.posts', {
                url: '/posts',
                views: {
                    'profileContent': {
                        templateUrl: 'views/app/profile/profile.posts.html'
                    }
                }
            })

            .state('app.profile.likes', {
                url: '/likes',
                views: {
                    'profileContent': {
                        templateUrl: 'views/app/profile/profile.likes.html'
                    }
                }
            })

            .state('app.shop', {
                url: '/shop',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/shop/shop.html'
                    }
                }
            })

            .state('app.shop.home', {
                url: '/',
                views: {
                    'shop-home': {
                        templateUrl: 'views/app/shop/shop-home.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('app.shop.popular', {
                url: '/popular',
                views: {
                    'shop-popular': {
                        templateUrl: 'views/app/shop/shop-popular.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('app.shop.sale', {
                url: '/sale',
                views: {
                    'shop-sale': {
                        templateUrl: 'views/app/shop/shop-sale.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('app.cart', {
                url: '/cart',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/shop/cart.html',
                        controller: 'ShoppingCartCtrl'
                    }
                }
            })

            .state('app.shipping-address', {
                url: '/shipping-address',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/shop/shipping-address.html',
                        controller: 'CheckoutCtrl'
                    }
                }
            })

            .state('app.checkout', {
                url: '/checkout',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/shop/checkout.html',
                        controller: 'CheckoutCtrl'
                    }
                }
            })

            .state('app.product-detail', {
                url: '/product/:productId',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/shop/product-detail.html',
                        controller: 'ProductCtrl'
                    }
                }
            })

            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/profile/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

        /** Main Feed **/
            .state('app.main-feed', {
                url: '/main-feed',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/main-feed/main-feed.html',
                        controller: 'MainFeedCtrl'
                    }
                }
            })

        /** Delivery **/
            .state('app.delivery-create', {
                cache: false,
                url: '/delivery/new',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/delivery/delivery-create.html',
                        controller: 'DeliveryCreateCtrl'
                    }
                },
                params: {
                    order: null,
                    index: -1
                }
            })
            .state('app.delivery-confirm', {
                url: '/delivery/confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/delivery/delivery-confirm.html',
                        controller: 'DeliveryConfirmCtrl'
                    }
                },
                params: {
                    delivery: null,
                    index: -1
                }
            })
            .state('app.delivery-history', {
                url: '/delivery/history/',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/delivery/delivery-history.html',
                        controller: 'DeliveryHistoryCtrl'
                    }
                }
            })
            .state('app.delivery-detail', {
                url: '/delivery/detail/:deliveryId',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/delivery/delivery-detail.html',
                        controller: 'DeliveryDetailCtrl'
                    }
                }
            })

        /** Order **/
            .state('app.order-create', {
                url: '/order/new',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/delivery/order/order-create.html',
                        controller: 'OrderCreateCtrl'
                    }
                },
                params: {
                    order: null,
                    index: -1
                }
            })

        /** Venue **/
            .state('app.venue-list', {
                url: '/venue-list',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/venue/venue-list.html',
                        controller: 'VenueListCtrl'
                    }
                }
            })
            .state('app.venue-detail', {
                cache: false,
                url: '/venue',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/venue/venue-detail.html',
                        controller: 'VenueDetailCtrl'
                    }
                },
                params: {
                    venue: {}
                }
            })

        /** Address Book **/
            .state('app.address-book', {
                cache: false,
                url: '/address-book',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/address-book/address-book.html',
                        controller: 'AddressBookCtrl'
                    }
                }
            })
            .state('app.address-book-set', {
                url: '/address-book-set',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/address-book/address-book-form.html',
                        controller: 'AddressBookEditCtrl'
                    }
                },
                params: {
                    'address': null
                }
            })

        /** My Account **/
            .state('app.my-account', {
                url: '/my-account',
                views: {
                    'menuContent': {
                        templateUrl: 'views/app/my-account/my-account.html',
                        controller: 'MyAccountCtrl'
                    }
                }
            })


            // MAIN: Splash
            .state('splash', {
                url: '/splash',
                templateUrl: 'views/welcome/splash.html',
                controller: 'SplashCtrl'
            })
            .state('intro', {
                url: '/intro',
                templateUrl: 'views/welcome/intro.html',
                controller: 'IntroCtrl'
            })
            // MAIN: Sign-In
            .state('sign-in', {
                url: '/sign-in',
                templateUrl: 'views/welcome/sign-in.html',
                controller: 'SignInCtrl'
            })
            // MAIN: Sign-Up (Step 1)
            .state('email-confirm', {
                url: '/user/register-email-confirm',
                templateUrl: 'views/auth/register-email-confirm.html',
                controller: 'RegisterAccountCtrl'
            })
            // MAIN: Sign-Up (Step 2)
            .state('register-form', {
                url: '/user/register-form',
                templateUrl: 'views/auth/register-form.html',
                controller: 'RegisterAccountCtrl',
                params: {
                    'email': null
                }
            })

            .state('facebook-sign-in', {
                url: '/facebook-sign-in',
                templateUrl: 'views/auth/facebook-sign-in.html',
                controller: 'WelcomeCtrl'
            })

            .state('dont-have-facebook', {
                url: '/dont-have-facebook',
                templateUrl: 'views/auth/dont-have-facebook.html',
                controller: 'WelcomeCtrl'
            })

            .state('create-account', {
                url: '/create-account',
                templateUrl: 'views/auth/create-account.html',
                controller: 'CreateAccountCtrl'
            })

            .state('welcome-back', {
                url: '/welcome-back',
                templateUrl: 'views/auth/welcome-back.html',
                controller: 'WelcomeBackCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/splash');
        //$urlRouterProvider.otherwise('/sign-in');
        //$urlRouterProvider.otherwise('/app/venue-list');
        //$urlRouterProvider.otherwise('/app/delivery/new');
        //$urlRouterProvider.otherwise('/app/delivery/history/');
        //$urlRouterProvider.otherwise('/app/delivery/569b1ad00f8c6f0e00210d39');
        //$urlRouterProvider.otherwise('/recover-password');
        //$urlRouterProvider.otherwise('/app/my-account');
        //$urlRouterProvider.otherwise('/app/address-book-set');

        //$urlRouterProvider.otherwise('user/register-form');

        //$urlRouterProvider.otherwise('/app/feed');
    })

;