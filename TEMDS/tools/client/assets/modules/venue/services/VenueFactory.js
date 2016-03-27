/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:45 PM
 */
'use strict';
angular.module('venue')
    .factory('VenueFactory', function (API_URL, $http, NotificationFactory, $q) {
        var venue = {},
            venueNotes = new NotificationFactory({
                id: 'venueNotes',
                position: 'top-middle'
            });

        venue.addVenue = function (venue) {
            return $http.post(API_URL + '/venue/addvenue', venue)
                .then(function success(response) {
                    venueNotes.addNotification({
                        title: response.data,
                        content: 'You can now edit this venue',
                        autoclose: 5000
                    });
                }, function error(err) {
                    venueNotes.addNotification({
                        title: 'Something went wrong!',
                        content: err.data,
                        autoclose: 5000
                    });
                });
        };

        venue.getNames = function () {
            var deferred = $q.defer();
            $http.get(API_URL + '/venue/getnames')
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error() {
                    deferred.reject({
                        message: 'unable to resolve venue names'
                    });
                });
            return deferred.promise;
        };

        venue.getVenue = function (venue) {
            var deferred = $q.defer();
            $http.get(API_URL + '/venue/getvenue/' + venue._id)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error() {
                    deferred.reject({
                        message: 'unable to resolve venue'
                    });
                });
            return deferred.promise;
        };

        venue.editVenue = function (venue) {
            return $http.put(API_URL + '/venue/editvenue', venue)
                .then(function success(response) {
                    venueNotes.addNotification({
                        title: response.data,
                        content: 'Database has been updated',
                        autoclose: 5000
                    });
                }, function error(err) {
                    venueNotes.addNotification({
                        title: 'Something went wrong!',
                        content: err.data,
                        autoclose: 5000
                    });
                });
        };

        venue.signAmazon = function (file) {
            var encName = encodeURIComponent(file[0].name);
            console.log('file', encName);
            console.log('type', file[0].type);
            var deferred = $q.defer();
            $http.get(API_URL + '/venue/signamazon/' + encName + '/' + file[0].type)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error() {
                    deferred.reject({
                        message: 'unable to sign into Amazon'
                    });
                });
            return deferred.promise;
        };

        return venue;
    });