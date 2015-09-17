angular.module('temds.app.services')


.service('MyAccountService', function ($http, $q, $localstorage) {

    this.changePassword = function (id, oldPass, newPass) {
        var dfd = $q.defer();

        $http.put(_API_HOST_ + 'api/user/update/password', {
                id: id,
                oldPass: oldPass,
                newPass: newPass
            })
            .success(function (response) {
                dfd.resolve(_SUCCESS_);
                console.log(response);

                // save new saltPass
                var user = $localstorage.getObject('user');
                user.saltPass = response.saltPass;
                $localstorage.setObject('user', user);
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(response.status);
            });

        return dfd.promise;
    }


    /**
     * Add/Edit address.
     * POST api: api/user/registerUser
     * @param {String}  id      unique identification string
     * @param {String}  name    address alias
     * @param {String}  addr1   street address
     * @param {String}  addr2   apt./fl./ste.
     * @param {String}  city    city/county
     * @param {String}  state   state abbriviation
     * @param {Number}  zipcode 5 digit number
     * @param {Boolean} primary is primary address?
     */
    this.setAddress = function (id, name, addr1, addr2, city, state, zipcode, primary) {

    }
});