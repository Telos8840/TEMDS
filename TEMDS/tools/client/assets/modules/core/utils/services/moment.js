/**
 * Created by GLee on 4/3/16.
 */
'use strict';
angular.module('utils')
    .factory('moment', function() {
        return window.moment; // assumes moment has already been loaded on the page
    });