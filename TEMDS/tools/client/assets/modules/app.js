const _ORDER_STATUS_CREATED_ = 0,
    _ORDER_STATUS_PROCESSING_ = 1,
    _ORDER_STATUS_DELIVERY_IN_PROGRESS_ = 2,
    _ORDER_STATUS_DELIVERED_ = 3,
    _ORDER_STATUS_DENIED_ = 4,
    _ORDER_STATUS_CANCELLED_ = 5,
    _ORDER_STATUS_ON_HOLD = 6; //TODO: move to .env or another file

(function () {
    'use strict';

    function config($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    function run() {
        FastClick.attach(document.body);
    }

    angular.module('application', [
        'ui.router',
        'ngAnimate',
        'xeditable',
        //app modules
        'core',
        'auth',
        'account',
        'usermanagement',
        //temds
        'order',
        'venue',
        //foundation
        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .constant('API_URL', '/api')
        .run(run);
})();