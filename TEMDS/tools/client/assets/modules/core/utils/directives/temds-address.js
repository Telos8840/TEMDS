/**
 * Created by GLee on 4/30/16.
 */
'use strict';

angular.module('utils')
    .directive('temdsAddress', function() {
        return {
            restrict: 'A',
            replace: false,
            scope: {
                address: '=address'
            },
            template: '{{address.addr1}}<br data-ng-show="address.addr1 != \'\'"/>' +
                '{{address.addr2}}<br data-ng-show="address.addr2 != \'\'"/>' +
                '{{address.city}},' +
                '{{address.state}},' +
                '{{address.zipcode}}'
        };
    });