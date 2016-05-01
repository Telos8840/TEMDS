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
				venue = obj.venue,
				type = obj.type;
			
			if (type === 'Img') {
				
			}
			
			var encName = encodeURIComponent(file[0].name);
			var encType = encodeURIComponent(file[0].type);
			console.log('file', encName);
			var api = path.join(API_URL, '/media/signamazon', encName, encType);
			console.log('api', api);
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