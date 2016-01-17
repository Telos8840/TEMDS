angular.module('temds.user.services')

.service('SignInService', function ($http, $q, $localstorage) {

    this.SignIn = function (email, rawPass) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/auth/signIn', {
            email: email,
            rawPass: rawPass
        }).success(function (response) {
            $localstorage.setObject('user', response);
            $localstorage.set('temdstoken', response.token);
            dfd.resolve(_SUCCESS_);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve(response.status);
        });

        return dfd.promise;
    };

    this.ReAuth = function () {
        var dfd = $q.defer();
        var user = $localstorage.getObject('user');

        if (user.saltPass && user.id) {
            $http.post(_API_HOST_ + 'api/auth/reAuth', {
                id: user.id,
                saltPass: user.saltPass
            }).success(function (response) {
                // update token
                $localstorage.set('temdstoken', response.token);
                dfd.resolve(_SUCCESS_);
            }).catch(function (response) {
                console.log(response);
                $localstorage.set('temdstoken', '');
                $localstorage.setObject('user', '');
                dfd.resolve(response.status);
            });
        } else {
            dfd.resolve(_FAIL_);
        }

        return dfd.promise;
    };

});