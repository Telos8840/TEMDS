angular.module('temds.user.services')

.service('SignInService', function ($http, $q, $localstorage) {

    this.SignIn = function (email, rawPass) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/auth/signIn', {
            email: email,
            rawPass: rawPass
        }).success(function (response) {
            $localstorage.setObject('user', response);
            dfd.resolve(_SUCCESS_);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve(response.status);
        });

        return dfd.promise;
    }

    this.ReAuth = function (id, saltPass) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/auth/reAuth', {
            id: id,
            saltPass: saltPass
        }).success(function (response) {
            dfd.resolve(_SUCCESS_);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve(response.status);
        });

        return dfd.promise;
    }

});