angular.module('temds.app.services')


.service('MyAccountService', function ($http, $q, $localstorage) {

    /**
     * Update user password.
     * Update local storage with updated salt password.
     * @param   {String} id      User ID
     * @param   {String} oldPass Current raw password
     * @param   {String} newPass New raw password
     * @returns {Number} _SUCCESS_ on success, status code otherwise
     */
    this.changePassword = function (id, oldPass, newPass) {
        var dfd = $q.defer();

        $http.put(_API_HOST_ + 'api/user/update/password', {
                id: id,
                oldPass: oldPass,
                newPass: newPass
            })
            .success(function (response) {
                dfd.resolve(_SUCCESS_);
                // save new name
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
     * Update user firstname and lastname.
     * Local storage will be updated in the controller.
     * @param   {String} id    User ID
     * @param   {String} fName User First Name
     * @param   {String} lName User Last Name
     * @returns {Number} _SUCCESS_ on success, status code otherwise
     */
    this.changeName = function (id, fName, lName) {
        var dfd = $q.defer();

        $http.put(_API_HOST_ + 'api/user/update/name', {
                id: id,
                fName: fName,
                lName: lName
            })
            .success(function (response) {
                dfd.resolve(_SUCCESS_);
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(response.status);
            })

        return dfd.promise;
    }

    /**
     * Update user phone number.
     * Local storage will be updated in the controller.
     * @param   {String}   id       User ID
     * @param   {String}   phoneNum Phone number
     * @returns {Number} _SUCCESS_ on success, status code otherwise
     */
    this.changePhoneNum = function (id, phoneNum) {
        var dfd = $q.defer();

        $http.put(_API_HOST_ + 'api/user/update/phoneNum', {
                id: id,
                phoneNum: phoneNum
            })
            .success(function (response) {
                dfd.resolve(_SUCCESS_);
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(response.status);
            })

        return dfd.promise;
    }
});