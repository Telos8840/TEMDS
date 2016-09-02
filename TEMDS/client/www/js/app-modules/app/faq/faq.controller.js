angular.module('temds.app.controllers')

    .controller('FAQCtrl', function ($scope, $filter, FAQService) {
        $scope.faqList = [];
        $scope.openedIndex = -1;

        /**
         * Get FAQ Data from the service
         */
        var getFAQData = function() {
            FAQService.GetFAQList().then(function(response) {
                $scope.faqList = response.data;
            }, function(response) {
                console.log('Error while getting FAQ List: ', response);
            });
        };

        var toggleFAQ = function(index) {
            $scope.openedIndex = $scope.openedIndex == index ? -1 : index;
        };

        $scope.Toggle = toggleFAQ;
        getFAQData();
    });