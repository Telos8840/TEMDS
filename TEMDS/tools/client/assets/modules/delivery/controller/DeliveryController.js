/**
 * Created by Saul on 9/3/16.
 */

'use strict';

angular.module('delivery')
	.controller('DeliveryController', function($scope, $state, $timeout, helper, appParams, NotificationFactory, orders) {
		console.log('orders', orders);
		$scope.orders = orders;
		$scope.selectedOrder = null;

		$scope.orderClicked = function (order) {
			console.log('clicked', order);
			$scope.selectedOrder = order;
		}
	});