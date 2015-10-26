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

    return venue;
  });