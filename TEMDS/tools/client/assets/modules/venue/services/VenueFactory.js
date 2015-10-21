/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:45 PM
 */
'use strict';
angular.module('venue')
  .factory('VenueFactory', function (API_URL, $http, NotificationFactory, _) {
    var venue = {},
      venueNotes = new NotificationFactory({
        id: 'venueNotes',
        position: 'top-middle'
      });
    
    venue.addVenue = function (venue) {
      return $http.post(API_URL + '/auth/signup', venue)
        .then(function success(response) {
          venueNotes.addNotification({
            title: venue.name + ' added!',
            content: response.data,
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

    return venue;
  });