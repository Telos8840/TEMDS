angular.module('temds.auth.services', [])

.service('RegisterService', function ($http, $q){
  // Signup Step #1: Send confirmation email
  this.sendRegisterEmailConfirmation = function(email) {
    if (email && email.trim() != '') {
      var dfd = $q.defer();

      $http.post(_API_HOST_ + 'api/user/register', {email: email})
      .success(function(response) {
        dfd.resolve('success: ' + response.data);
      }).catch(function(response) {
        dfd.resolve('error: ' + response.data.message);
      });

      return dfd.promise;
    }
    return 'error: empty email'
  };
});
