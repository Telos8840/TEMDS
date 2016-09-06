/**
 * Created by Saul on 9/3/16.
 */

'use strict';
angular.module('delivery', ['ui.router'])
	.config(function ($stateProvider) {
		$stateProvider.state('deliveries', {
			url: '/deliveries',
			templateUrl: 'templates/delivery/deliveries.html',
			controller: 'DeliveryController',
			data: {
				requiresLogin: true
			},
			resolve: {
				orders: function (DeliveryFactory, AuthFactory) {
					return DeliveryFactory.GetMyDeliveries(AuthFactory.user.id);
				}
			},
			animation: {
				enter: 'slideInRight',
				leave: 'slideOutRight'
			}
		});
	}).run(function () {});