/**
 * Created by GLee on 3/26/16.
 */
'use strict';



angular.module('order')
    .factory('OrderFactory', function (API_URL, $http, NotificationFactory, $q, helper, path, appParams) {
        var order = {},
        notification = new NotificationFactory({
            id: 'orderNotification',
            position: 'top-middle'
        });

        order.GetOrderList = function(pageNum, itemsPerPage, query) {
            var deferred = $q.defer();

            var api = path.join(API_URL, '/order/li/', String(pageNum), String(itemsPerPage));
            var q = helper.toQueryString(query);
            if (q) api += '?' + q;

            $http.get(api)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on GetOrderList:\n' + err
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        };

        order.GetOrderDetail = function(id) {
            var deferred = $q.defer();

            var api = path.join(API_URL, '/order/', String(id));
            $http.get(api)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on GetOrderDetail:\n' + err
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        };

        return order;
    });