/**
 * Created by Saul on 4/20/16.
 */

'use strict';
angular.module('media')
	.controller('MediaController', function ($scope, MediaFactory, VenueFactory, venueNames, _) {
		$scope.venueNames = venueNames;
		$scope.mediaType = null;
		$scope.selectedVenue = null;

		$scope.getVenueImages = function (v) {
			VenueFactory.getVenue(v).then(function (venueObj) {
				$scope.selectedVenue = venueObj;
				console.log('V OBJ', $scope.selectedVenue);
			});
		};

		$scope.onChange = function (img) {
			if (img.length > 0) {

				var obj = { file: img, venue: $scope.selectedVenue, type: $scope.mediaType };


				console.log('changing', obj);

				var fileExtension = '.' + img.file[0].name.split('.').pop();

				img.file[0].name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

				console.log(img.file[0].name);
				// MediaFactory.signAmazon(obj).then(function (signed) {
				// 	console.log('ama signed', signed);
				// });
			}
		};

		$scope.uploadImage = function () {
			if (!$scope.mediaType || !$scope.selectedVenue) {
				alert("Please pick a venue or select  an image type");
				return;
			}

			var type = $scope.mediaType.split(" ").splice(-1);
			$scope.mediaType = null;

		};

	});