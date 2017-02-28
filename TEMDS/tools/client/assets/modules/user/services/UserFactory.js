'use strict';

angular.module('user')
    .factory('UserFactory', function (API_URL, $http, NotificationFactory, $q, helper, path, appParams, _) {
        var notification = new NotificationFactory({
            id: 'userNotification',
            position: 'top-middle'
        });

        function getUsers() {
            var deferred = $q.defer();
            $http.get(API_URL + '/user/users')
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error() {
                    deferred.reject({
                        message: 'unable to resolve userlist'
                    });
                });
            return deferred.promise;
        }

        function getDrivers() {
            var deferred = $q.defer();
            $http.get(API_URL + '/user/users')
                .then(function success(response) {
                    var drivers = [];

                    _.each(response.data, function (user) {
                       _.each(user.roles, function (value) {
                           if (value === 'driver') {
                               drivers.push(user);
                           }
                       })
                    });

                    deferred.resolve(drivers);
                }, function error() {
                    deferred.reject({
                        message: 'unable to resolve drivers'
                    });
                });
            return deferred.promise;
        }

        function updateUser(user) {
            $http.put(API_URL + '/user/' + user._id, user);
        }

        /**
         * Get client user detail by user id
         * @param uId
         */
        function getUserDetailById(uId) {
            var deferred = $q.defer();
            var api = path.join(API_URL, '/user/clients', String(uId), 'detail');

            $http.get(api)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    var message = 'Error on getUserDetailById:\n' + err.data;

                    deferred.reject({
                        message: message
                    });
                    notification.addNotification({
                        title: 'Error',
                        content: message,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        }

        /**
         * Get client user account info + detail by user id
         * @param uId
         * @returns {*}
         */
        function getUserById(uId) {
            var deferred = $q.defer();
            var api = path.join(API_URL, '/user/clients', String(uId));

            $http.get(api)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    var message = 'Error on getUserById:\n' + err.data;

                    deferred.reject({message: message});
                    notification.addNotification({
                        title: 'Error',
                        content: message,
                        autoclose: appParams.Constants.NOTIFICATION_AUTO_CLOSE_TIMEOUT
                    });
                });

            return deferred.promise;
        }

        return {
            getUsers: getUsers,
            getDrivers: getDrivers,
            updateUser: updateUser,
            getUserDetailById: getUserDetailById,
            getUserById: getUserById,
            roles: ['registered', 'user', 'editor', 'admin', 'manager', 'driver']
        };
    });