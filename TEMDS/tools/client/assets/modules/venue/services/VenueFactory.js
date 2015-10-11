/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:45 PM
 */
'use strict';
angular.module('venue')
  .factory('VenueFactory', function (API_URL, store, $http, NotificationFactory, jwtHelper, _) {
    var venue = {},
      token = store.get('token'),
      venueNotes = new NotificationFactory({
        id: 'authNotes',
        position: 'top-middle'
      });
    if (token) {
      venue.user = jwtHelper.decodeToken(token);
    }

    
    venue.addVenue = function (venue) {

    };

    return venue;
  });