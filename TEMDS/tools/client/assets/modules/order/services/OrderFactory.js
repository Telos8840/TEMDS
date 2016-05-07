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

        /**
         * Returns a filtered and paginated list of order objects
         * @param pageNum
         * @param itemsPerPage
         * @param query
         * @returns {*}
         * @constructor
         */
        order.GetOrderList = function(pageNum, itemsPerPage, query) {
            var deferred = $q.defer(),
                api = path.join(API_URL, '/order/li/', String(pageNum), String(itemsPerPage)),
                q = helper.toQueryString(query);
            if (q) api += '?' + q;

            $http.get(api)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on GetOrderList:\n' + err.data
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        };

        /**
         * Returns order object that matches the order id
         * @param id
         * @returns {*}
         * @constructor
         */
        order.GetOrderDetail = function(id) {
            var deferred = $q.defer();

            var api = path.join(API_URL, '/order/', String(id));
            $http.get(api)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on GetOrderDetail:\n' + err.data
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: err.data,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        };

        /**
         * Returns order object that matches the confirmation number.
         * @param cn
         * @param ignoreError
         * @returns {*}
         * @constructor
         */
        order.GetOrderByConfirmationNumber = function(cn, ignoreError) {
            var deferred = $q.defer();

            var api = path.join(API_URL, 'order', cn, 'confirmNum');
            $http.get(api)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on GetOrderByConfirmationNumber:\n' + err.data
                    });
                    if (!ignoreError) {
                        notification.addNotification({
                            title: 'Error',
                            content: err.data,
                            autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                        });
                    }
                });

            return deferred.promise;
        };

        /**
         * Update the order
         *     It will overwrite order object with updateRequest
         * @param updateRequest
         * @returns {*}
         * @constructor
         */
        order.UpdateOrder = function(updateRequest) {
            var deferred = $q.defer();

            var api = path.join(API_URL, 'order');

            $http.put(api, updateRequest)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject({
                        message: 'Error on UpdateOrder:\n' + err.data
                    });
                    if (!ignoreError) {
                        notification.addNotification({
                            title: 'Error',
                            content: err.data,
                            autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                        });
                    }
                });

            return deferred.promise;
        };

        /**
         * Retruns status descriptiong string from status code.
         * @param statusCode
         * @returns {*}
         * @constructor
         */
        order.GetOrderStatusDescription = function(statusCode) {
            for (var s in appParams.OrderStatus) {
                if (statusCode === appParams.OrderStatus[s])
                    return helper.camelToNormalString(s, true).trim();
            }

            return 'Unknown';
        };

        return order;
    });