'use strict';
angular.module('utils')
    .factory('helper', function () {
        return {

            /**
             * Convert object to a query string
             * @param obj
             * @returns {*}
             */
            toQueryString: function (obj) {
                // obj is null
                if (obj === undefined || obj === null) {
                    return null;
                }

                if (typeof obj === 'string')
                    return encodeURIComponent(obj);

                // obj is an object/array
                if (typeof obj === 'object') {
                    return Object.keys(obj).map(function(key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
                    }).join('&');
                }

                return null;
            }
        };

    });