/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:38 PM
 */

'use strict';
angular.module('venue', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider.state('venues', {
      url: '/venues',
      templateUrl: 'templates/venue/venues.html',
      controller: 'VenueController',
      data: {
        requiresLogin: true
      },
      resolve: {
        venueNames: function (VenueFactory) {
          return VenueFactory.getNames();
        }
      },
      animation: {
        enter: 'slideInRight',
        leave: 'slideOutRight'
      }
    });
  }).run(function () {});