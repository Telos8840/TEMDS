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


/*

For Testing purposes

{
	"_id": {
	"$oid": "57f9769d0abf640e0068430d"
},
	"recipient": "Saul Guardado",
	"orders": [
	{
		"venue": {
			"_id": "57040b83da699d1e00cca481",
			"img": "https://s3-us-west-2.amazonaws.com/temds/57040b83da699d1e00cca481/DSC_8223.JPG",
			"category": "Food",
			"name": "FoodMe"
		},
		"items": [
			{
				"description": "Testing"
			}
		],
		"comment": ""
	},
	{
		"venue": {
			"_id": "578d9eec9d9e6e1e00db5c58",
			"category": "Other",
			"name": "Aguas Tijuanas",
			"img": "http://lorempixel.com/50/50/abstract/3"
		},
		"items": [
			{
				"description": "Test 2"
			},
			{
				"description": "Test 3"
			}
		],
		"comment": "With comments"
	}
],
	"deliveryAddress": {
	"id": "57c912feaa43320e00b01f4c",
		"name": "My Home",
		"addr1": "756 S. BROADWAY",
		"addr2": "401",
		"city": "LOS ANGELES",
		"state": "CA",
		"zipcode": "90014"
},
	"uId": "57c912feaa43320e00b01f4b",
	"status": 0,
	"insertDate": {
	"$date": "2016-10-08T22:43:41.261Z"
},
	"modifiedDate": {
	"$date": "2016-10-08T22:43:41.261Z"
},
	"confirmationNumber": "157A6775652"
}*/
