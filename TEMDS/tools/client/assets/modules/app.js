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
        'angularFileUpload',
        //app constants
        'const',
        //app modules
        'core',
        'auth',
        'account',
        'usermanagement',
        //temds
        'order',
        'venue',
        'media',
        //foundation
        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .constant('API_URL', '/api')
        .run(run);
})();