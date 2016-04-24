/**
 * Created by Saul on 4/20/16.
 */

'use strict';
angular.module('media', ['ui.router'])
	.config(function ($stateProvider) {
		$stateProvider.state('media', {
			url: '/media',
			templateUrl: 'templates/media/media.html',
			controller: 'MediaController',
			data: {
				requiresLogin: true
			},
			resolve: {
				venueNames: function (VenueFactory) {
					return VenueFactory.getNames();
				}
			},
			animation: {
				enter: 'slideInRight',
				leave: 'slideOutRight'
			}
		});
	}).run(function () {});