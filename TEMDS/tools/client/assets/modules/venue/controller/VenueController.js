/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:41 PM
 */
'use strict';
angular.module('venue')
  .controller('VenueController', function ($scope, VenueFactory, venueNames, _) {
    var freshVenue = {
      name: '',
      address: {
        addr1: '',
        addr2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      description: '',
      category: '',
      tags: '',
      img: '',
      hours: {
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
        SUN: false
      },
      openTime: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      openAP: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      closeTime: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      closeAP: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      }
    };
    $scope.venue = {
      name: '',
      address: {
        addr1: '',
        addr2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      description: '',
      category: '',
      tags: '',
      img: '',
      hours: {
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
        SUN: false
      },
      openTime: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      openAP: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      closeTime: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      },
      closeAP: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: ''
      }
    };
    $scope.times = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    $scope.days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    $scope.categories = ['Accessories', 'Alcohol', 'Appliances', 'Arts / Crafts', 'Automotive', 'Beauty', 'Books', 'Clothing', 'Electronics', 'Garden', 'Grocery', 'Health', 'Hardware', 'Jewelry', 'Office', 'Other', 'Personal Products', 'Pet', 'Sports', 'Toys'];
    $scope.venueNames = venueNames;
    console.log('names', $scope.venueNames);

    $scope.addVenue = function (venue) {
      var temp = venue.tags.split(/[\s,]+/).join();
      venue.tags = temp.split(',');

      // Formats all the hours properly
      _($scope.days).forEach(function(n) {
        if(venue.hours[n] === true) {
          venue.hours[n] = venue.openTime[n] + venue.openAP[n] + ' - ' + venue.closeTime[n] + venue.closeAP[n];
        } else {
          venue.hours[n] = 'Closed';
        }
      }).value();

      var detail = _.pick(venue, ['address', 'description', 'tags', 'hours']);

      // Cleans up unneeded properties
      venue = _.omit(venue, ['address', 'description', 'tags', 'hours', 'openTime', 'openAP', 'closeTime', 'closeAP']);

      var venueObj = { venue: venue, detail: detail };
      VenueFactory.addVenue(venueObj);

      $scope.venue = freshVenue;
      VenueFactory.getNames().then(function (newVenues) {
        $scope.venueNames = newVenues;
      });
    };

    $scope.getVenue = function (v) {
      console.log('venue', v);

    }
  });

