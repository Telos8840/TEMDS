/**
 * Created by Saul on 9/3/16.
 */

'use strict';

angular.module('delivery')
	.factory('DeliveryFactory', function (API_URL, $http, NotificationFactory, $q, helper, path, appParams) {
		var delivery = {},
			notification = new NotificationFactory({
				id: 'notification',
				position: 'top-middle'
			});

		delivery.GetMyDeliveries = function (id) {
			var deferred = $q.defer();

			var api = path.join(API_URL, '/delivery/getmydeliveries/', String(id));
			$http.get(api)
				.then(function(response) {
					deferred.resolve(response.data);
				}, function error(err) {
					deferred.reject({
						message: 'Error on GetMyDeliveries:\n' + err.data
					});
					notification.addNotification({
						title: 'Error',
						content: err.data,
						autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
					});
				});

			return deferred.promise;

		};

		return delivery;
	});