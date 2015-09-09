angular.module('temds.auth.services', [])

.service('RegisterService', function ($http, $q) {
    // Signup Step #1: Send confirmation email
    this.sendEmailConfirmation = function (email) {
        if (email && email.trim() != '') {
            var dfd = $q.defer();

            $http.post(_API_HOST_ + 'api/user/emailConfirmation', {
                    email: email
                }).success(function (response) {
                    dfd.resolve('success: ' + response.data);
                }).catch(function (response) {
                    dfd.resolve('error: ' + response.data.message);
                });

            return dfd.promise;
        }
        return 'error: empty email'
    };
    
    /**
     * Check if confirmation number matches with the email address.
     * @param   {String} email      User email address
     * @param   {String} confirmNum Five digit number
     * @returns {Boolean} true / false
     */
    this.checkEmailConfirmation = function (email, confirmNum) {
        
        if (email && confirmNum) {
            var dfd = $q.defer();

            $http.get(_API_HOST_ + 'api/user/emailConfirmation', {
                    email: email,
                    confirmNum: confirmNum
                }).success(function (response) {
                    dfd.resolve(true);
                }).catch(function (response) {
                    dfd.resolve(false);
                });

            return dfd.promise;
        }
        return false;
    }
});