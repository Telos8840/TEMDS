/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:45 PM
 */

'use strict';



angular.module('venue')
    .factory('VenueFactory', function (API_URL, $http, NotificationFactory, $q, helper, path, appParams) {
        var venue = {},
            notification = new NotificationFactory({
                id: 'notification',
                position: 'top-middle'
            });

        venue.addVenue = function (venue) {
            return $http.post(API_URL + '/venue/addvenue', venue)
                .then(function success(response) {
                    notification.addNotification({
                        title: response.data,
                        content: 'You can now edit this venue',
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                }, function error(err) {
                    notification.addNotification({
                        title: 'Something went wrong!',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
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

        venue.editVenue = function (venue) {
            return $http.put(API_URL + '/venue/editvenue', venue)
                .then(function success(response) {
                    notification.addNotification({
                        title: response.data,
                        content: 'Database has been updated',
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                }, function error(err) {
                    notification.addNotification({
                        title: 'Something went wrong!',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });
        };

        /**
         * Passthrough to get venue by venue id
         * @param venue
         * @returns {*}
         */
        venue.getVenue = function (venue) {
            return this.getVenueById(venue._id);
        };

        /**
         * Get venue by venue id
         * @param vid
         */
        venue.getVenueById = function(vid) {
            var deferred = $q.defer();
            var api = path.join(API_URL, '/venue/getvenue/', String(vid));

            $http.get(api)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    var message = 'Error on getVenueById:\n' + err;

                    deferred.reject({
                        message: message
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: message,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        };

        return venue;
    });