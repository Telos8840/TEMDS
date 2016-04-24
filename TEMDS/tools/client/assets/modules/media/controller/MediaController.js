/**
 * Created by Saul on 4/20/16.
 */

'use strict';
angular.module('media')
	.controller('MediaController', function ($scope, MediaFactory, VenueFactory, venueNames, _) {
		$scope.venueNames = venueNames;
		$scope.mediaType = null;

		$scope.getVenueImages = function (v) {
			console.log('Venue', v);
		};

		$scope.uploadImage = function () {
			console.log('Radio', $scope.mediaType);

		};

		$scope.onChange = function (img, type) {
			if (img.length > 0) {
				console.log('changing', img[0].name);
				console.log('thumb', $scope.venue.thumbnail);
				$scope.$apply(function() {
					$scope.venue.thumbnail = img[0].name;
				});

				VenueFactory.signAmazon(img).then(function (signed) {
					console.log('ama signed', signed);
				});
			}
			console.log('thumb', $scope.venue.thumbnail);

		};
	});