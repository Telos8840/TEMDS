angular.module('temds.app.services')

    .service('FAQService', function ($http, $q) {

        this.GetFAQList = function () {
            return $http.get('data/faq.json');
        };
    });