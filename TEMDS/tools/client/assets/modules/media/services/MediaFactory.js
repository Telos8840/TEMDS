/**
 * Created by Saul on 4/20/16.
 */

'use strict';
angular.module('media')
	.factory('MediaFactory', function (API_URL, $http, NotificationFactory, $q, path) {
		var media = {},
			mediaNotes = new NotificationFactory({
				id: 'mediaNotes',
				position: 'top-middle'
			});

		media.signAmazon = function (obj) {
			var file = obj.file,
				venueId = obj.venueId;
			
			var encName = encodeURIComponent(file.name);
			var encType = encodeURIComponent(file.type);
			var api = path.join(API_URL, '/media/signamazon', encName, encType, venueId);
			var deferred = $q.defer();

			$http.get(api)
				.then(function success(response) {
					deferred.resolve(response.data);
				}, function error() {
					deferred.reject({
						message: 'unable to sign into Amazon'
					});
				});
			return deferred.promise;
		};
		
		return media;
	});