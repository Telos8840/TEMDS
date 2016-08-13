/**
 * Created by GLee on 3/26/16.
 */

'use strict';
angular.module('order', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('orders', {
                url: '/orders',
                templateUrl: 'templates/order/index.html',
                controller: 'OrderListController',
                data: {
                    requiresLogin: true
                },
                resolve: { },
                animation: {
                    enter: 'slideInRight',
                    leave: 'slideOutRight'
                }
            })
            .state('orders.detail', {
                url: '/:orderId',
                templateUrl: 'templates/order/detail.html',
                controller: 'OrderDetailController',
                data: {
                    requiresLogin: true
                },
                resolve: { },
                animation: {
                    enter: 'slideInRight',
                    leave: 'slideOutLeft'
                }
            });
    }).run(function () {});
