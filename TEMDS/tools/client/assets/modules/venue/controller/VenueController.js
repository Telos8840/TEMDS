/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/7/15
 * Time: 10:41 PM
 */
'use strict';
angular.module('venue')
  .controller('VenueController', function ($scope, VenueFactory) {
    $scope.venue = {
      address: {}
      //hours: {}
    };
    $scope.times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    $scope.days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    $scope.categories = ["Accessories", "Alcohol", "Appliances", "Arts / Crafts", "Automotive", "Beauty", "Books", "Clothing", "Electronics", "Garden", "Grocery", "Health", "Hardware", "Jewelry", "Office", "Other", "Personal Products", "Pet", "Sports", "Toys"];
    $scope.tags = ["breakfast", "lunch", "dinner"];
    $scope.addVenue = function (venue) {
      console.log("called", venue);

      VenueFactory.addVenue(venue);
    };
  });

