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
      thumbnail: '',
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
      thumbnail: '',
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
    $scope.editVenue = {
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
      thumbnail: '',
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

      var detail = _.pick(venue, ['address', 'description', 'tags', 'hours', 'img']);

      var ranNum = 0;
      if(detail.img.trim() === '') {
        ranNum = Math.floor(Math.random() * 10) + 1;
        detail.img = 'http://lorempixel.com/375/200/abstract/' + ranNum;
      }

      // Cleans up unneeded properties
      venue = _.omit(venue, ['address', 'description', 'tags', 'hours', 'img', 'openTime', 'openAP', 'closeTime', 'closeAP']);

      if(venue.thumbnail.trim() === '') {
        ranNum = Math.floor(Math.random() * 10) + 1;
        venue.thumbnail = 'http://lorempixel.com/50/50/abstract/' + ranNum;
      }

      var venueObj = { venue: venue, detail: detail };
      VenueFactory.addVenue(venueObj);

      $scope.venue = freshVenue;
      VenueFactory.getNames().then(function (newVenues) {
        $scope.venueNames = newVenues;
      });
    };

    $scope.getVenue = function (v) {
      VenueFactory.getVenue(v).then(function (venueObj) {
        var venue = venueObj.venue,
          detail = venueObj.detail;

        // Reconstruct bindings
        _($scope.days).forEach(function (n) {
          if(detail.hours[n] === 'Closed') {
            $scope.editVenue.hours[n] = false;
            $scope.editVenue.openTime[n] = '';
            $scope.editVenue.openAP[n] = '';
            $scope.editVenue.closeTime[n] = '';
            $scope.editVenue.closeAP[n] = '';
          } else {
            $scope.editVenue.hours[n] = true;
            var time = detail.hours[n].split(/[\s-]+/);
            $scope.editVenue.openTime[n] = time[0].match(/\d+/)[0];
            $scope.editVenue.openAP[n] = time[0].match(/[a-zA-Z]+/g)[0];
            $scope.editVenue.closeTime[n] = time[1].match(/\d+/)[0];
            $scope.editVenue.closeAP[n] = time[1].match(/[a-zA-Z]+/g)[0];
          }
        }).value();

        detail.tags = detail.tags.join(', ');
        $scope.editVenue.venueId = _.pick(venue, '_id');
        $scope.editVenue.detailId = _.pick(detail, '_id');

        detail = _.omit(detail, ['_id', 'venueId', 'hours']); // Needs to be pulled out so it doesn't affect binding
        venue = _.omit(venue, '_id');

        // Overwrites matching properties
        $scope.editVenue = _.extend($scope.editVenue, venue);
        $scope.editVenue = _.extend($scope.editVenue, detail);
      });
    };

    $scope.modifyVenue = function (venue) {
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

      var detail = _.pick(venue, ['detailId', 'address', 'description', 'tags', 'hours', 'img']);
      // Cleans up unneeded properties
      venue = _.omit(venue, ['detailId', 'address', 'description', 'tags', 'hours', 'img', 'openTime', 'openAP', 'closeTime', 'closeAP']);

      var venueObj = { venue: venue, detail: detail };
      VenueFactory.editVenue(venueObj);

      $scope.editVenue = freshVenue;
      VenueFactory.getNames().then(function (newVenues) {
        $scope.venueNames = newVenues;
      });
    };
  });

