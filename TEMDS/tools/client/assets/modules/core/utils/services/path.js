/**
 * Created by GLee on 3/26/16.
 */
'use strict';
angular.module('utils')
    .factory('path', function() {
        return window.path; // assumes path has already been loaded on the page
    });