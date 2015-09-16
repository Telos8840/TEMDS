angular.module('temds.user.services')

.service('RegisterService', function ($http, $q, $localstorage) {
    // Signup Step #1: Send confirmation email

    /**
     * Validate user email by sending an email with number. 
     * This is the 1st step to register a new user.
     * @param   {String!}  email User email address
     * @returns {Number} Status Code
     */
    this.sendEmailConfirmation = function (email) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/auth/emailConfirmation', {
            email: email
        }).success(function (response) {
            dfd.resolve(_SUCCESS_);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve(response.status);
        });

        return dfd.promise;
    };

    /**
     * Check if confirmation number matches with the email address.
     * @param   {String!} email      User email address
     * @param   {String!} confirmNum Five digit number
     * @returns {Boolean} True on success
     */
    this.checkEmailConfirmation = function (email, confirmNum) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/auth/confirmationNumber', {
            email: email,
            confirmNum: parseInt(confirmNum)
        }).success(function (response) {
            dfd.resolve(true);
        }).catch(function (response) {
            console.log(response.data.message);
            dfd.resolve(false);
        });

        return dfd.promise;
    }

    /**
     * Create user
     * @param   {Object}  userData User Object
     * @returns {Boolean} success or fail
     */
    this.registerNewUser = function (userData) {
        var dfd = $q.defer();

        // format and set defaults
        var data = angular.copy(userData);
        data.bDay = moment(userData.bDay).format('MM/DD/YYYY');
        data.address.name = 'My Home';
        data.address.state = userData.address.state.abbr;
        data.address.primary = true;

        $http.post(_API_HOST_ + 'api/auth/registerUser', data)
            .success(function (response) {
                data.id = response.id;
                data.saltPass = response.saltPass;
                delete data.rawPass;
                $localstorage.setObject('user', data);
                dfd.resolve(true);
            }).catch(function (response) {
                console.log(response.data.message);
                dfd.resolve(false);
            });

        return dfd.promise;
    }

    /**
     * This is debug use only.
     * TODO: remove
     */
    this.LocalStorageUser = function () {
        return $localstorage.getObject('user');
    }
});