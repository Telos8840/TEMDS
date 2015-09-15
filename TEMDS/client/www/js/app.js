angular.module('underscore', [])
    .factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    });

angular.module('temds', [
    'ionic',
    'temds.common.directives',

  /* Main Application */ //NOTE: used for reference.
    'temds.app.controllers',
    'temds.app.services',

  /* Authentication */
    'temds.auth.controllers',
    'temds.auth.services',

    'temds.views',
    'underscore',
    'angularMoment'
])


// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
.config(function ($ionicConfigProvider) {
    if (ionic.Platform.isAndroid()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }
})

.run(function ($ionicPlatform, $rootScope, $ionicHistory) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    //SIDE MENU ROUTES
        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "views/app/side-menu.html",
        controller: 'AppCtrl'
    })

    .state('app.feed', {
        url: "/feed",
        views: {
            'menuContent': {
                templateUrl: "views/app/feed.html",
                controller: "FeedCtrl"
            }
        }
    })

    .state('app.profile', {
        abstract: true,
        url: '/profile/:userId',
        views: {
            'menuContent': {
                templateUrl: "views/app/profile/profile.html",
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
        url: "/shop",
        abstract: true,
        views: {
            'menuContent': {
                templateUrl: "views/app/shop/shop.html"
            }
        }
    })

    .state('app.shop.home', {
        url: "/",
        views: {
            'shop-home': {
                templateUrl: "views/app/shop/shop-home.html",
                controller: 'ShopCtrl'
            }
        }
    })

    .state('app.shop.popular', {
        url: "/popular",
        views: {
            'shop-popular': {
                templateUrl: "views/app/shop/shop-popular.html",
                controller: 'ShopCtrl'
            }
        }
    })

    .state('app.shop.sale', {
        url: "/sale",
        views: {
            'shop-sale': {
                templateUrl: "views/app/shop/shop-sale.html",
                controller: 'ShopCtrl'
            }
        }
    })

    .state('app.cart', {
        url: "/cart",
        views: {
            'menuContent': {
                templateUrl: "views/app/shop/cart.html",
                controller: 'ShoppingCartCtrl'
            }
        }
    })

    .state('app.shipping-address', {
        url: "/shipping-address",
        views: {
            'menuContent': {
                templateUrl: "views/app/shop/shipping-address.html",
                controller: "CheckoutCtrl"
            }
        }
    })

    .state('app.checkout', {
        url: "/checkout",
        views: {
            'menuContent': {
                templateUrl: "views/app/shop/checkout.html",
                controller: "CheckoutCtrl"
            }
        }
    })

    .state('app.product-detail', {
        url: "/product/:productId",
        views: {
            'menuContent': {
                templateUrl: "views/app/shop/product-detail.html",
                controller: 'ProductCtrl'
            }
        }
    })

    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "views/app/profile/settings.html",
                controller: 'SettingsCtrl'
            }
        }
    })

    /** Address Book **/
    .state('app.address-book', {
        url: "/address-book",
        views: {
            'menuContent': {
                templateUrl: "views/app/address-book/address-book.html",
                controller: "AddressBookCtrl"
            }
        }
    })

    /** My Account **/
    .state('app.my-account', {
        url: "/my-account",
        views: {
            'menuContent': {
                templateUrl: "views/app/my-account/my-account.html",
                controller: 'MyAccountCtrl'
            }
        }
    })



    //AUTH ROUTES
    .state('splash-page', {
        url: "/splash-page",
        templateUrl: "views/auth/splash-page.html",
        controller: 'WelcomeCtrl'
    })

    // TODO: THIS PAGE NEEDS TO BE BUILT
    .state('sign-in', {
        url: "/sign-in",
        templateUrl: "views/auth/sign-in.html",
        controller: 'WelcomeCtrl'
    })

    .state('email-confirm', {
        url: "/user/register-email-confirm",
        templateUrl: "views/auth/register-email-confirm.html",
        controller: 'RegisterAccountCtrl'
    })

    .state('register-form', {
            url: "/user/register-form",
            templateUrl: "views/auth/register-form.html",
            controller: 'RegisterAccountCtrl',
            params: {
                'email': null
            }
        })
        .state('facebook-sign-in', {
            url: "/facebook-sign-in",
            templateUrl: "views/auth/facebook-sign-in.html",
            controller: 'WelcomeCtrl'
        })

    .state('dont-have-facebook', {
        url: "/dont-have-facebook",
        templateUrl: "views/auth/dont-have-facebook.html",
        controller: 'WelcomeCtrl'
    })

    .state('create-account', {
        url: "/create-account",
        templateUrl: "views/auth/create-account.html",
        controller: 'CreateAccountCtrl'
    })

    .state('welcome-back', {
        url: "/welcome-back",
        templateUrl: "views/auth/welcome-back.html",
        controller: 'WelcomeBackCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/splash-page');
    $urlRouterProvider.otherwise('/app/my-account');
    //$urlRouterProvider.otherwise('user/register-form');

    //$urlRouterProvider.otherwise('/app/feed');
})

;