(function () {
    'use strict';

    function config($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    }

    function run(editableOptions) {
        FastClick.attach(document.body);
        editableOptions.theme = 'bs3';
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
        'user',
        //temds
        'order',
        'venue',
        'media',
        'delivery',
        //foundation
        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .constant('API_URL', '/api')
        .run(run);
})();