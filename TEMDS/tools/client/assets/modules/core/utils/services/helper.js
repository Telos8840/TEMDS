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
            },

            /**
             * Convert camel case string to normal string.
             * Ex) helloWorldGoodbyeWorld -> Hello World Goodbye World
             * @param camelString
             * @param setUpperCaseFirstLetter each first letter is set to upper case
             * @returns {*}
             */
            camelToNormalString: function(camelString, setUpperCaseFirstLetter) {
                if (!camelString) return '';

                // insert a space before all caps
                camelString = camelString.replace(/([A-Z])/g, ' $1');

                // uppercase the first character
                if (setUpperCaseFirstLetter)
                    camelString.replace(/^./, function(str){ return str.toUpperCase(); });

                return camelString;
            }
        };

    });