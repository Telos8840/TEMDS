/**
 * Created by Saul on 4/20/16.
 */

'use strict';
angular.module('media')
	.controller('MediaController', function ($scope, store, MediaFactory, VenueFactory, venueNames, FileUploader, API_URL, _) {
		var uploader = $scope.uploader = new FileUploader({
			url: API_URL + '/media/upload',
			headers: {
				Authorization: 'Bearer ' + store.get('token')
			}
		});

		$scope.venueNames = venueNames;
		$scope.mediaType = null;
		$scope.selectedVenue = null;

		// FILTERS
		uploader.filters.push({
			name: 'imageFilter',
			fn: function(item /*{File|FileLikeObject}*/, options) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		});

		uploader.onAfterAddingFile = function(fileItem) {
			var obj = { file: fileItem._file, venueId: $scope.selectedVenue.venue._id };
			MediaFactory.signAmazon(obj).then(function (signed) {
				fileItem.formData.push({
					s3: signed
				});
			});
		};

		uploader.onBeforeUploadItem = function(item) {
			item.formData.push({
				isMain: item.mainImage ? true : false,
				venueId: $scope.selectedVenue.venue._id
			});
		};

		uploader.onCompleteItem = function(fileItem, response, status, headers) {
			console.info('onCompleteItem', fileItem, response, status, headers);
		};

		$scope.getVenueImages = function (v) {
			VenueFactory.getVenue(v).then(function (venueObj) {
				$scope.selectedVenue = venueObj;
			});
		};
	});