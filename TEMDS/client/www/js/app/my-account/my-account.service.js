angular.module('temds.app.services')


.service('MyAccountService', function ($http, $q) {

    this.changePassword = function (old_pass, new_pass) {
        var dfd = $q.defer();
        dfd.resolve(true); //test:success

        /*
        $http.post(_API_HOST_ + '/api/user/change_password').success(function (res) {
            dfd.resolve(true); //success
        }).catch(function (res) {
            dfd.resolve(false);
            //if (res.statusCode == 111)
        });
        */

        return dfd.promise;
    }


    this.getAddressList = function (page) {

        var pageSize = 10, // set your page size, which is number of records per page
            skip = pageSize * (page - 1),
            totalPosts = 1,
            totalPages = 1,
            dfd = $q.defer();

        $http.get('data/sample_addressbook.json').success(function (database) {

            totalPosts = database.addressList.length;
            totalPages = totalPosts / pageSize;

            var addressList = database.addressList.slice(skip, skip + pageSize);


            dfd.resolve({
                addressList: addressList,
                totalPages: totalPages
            });
        });

        return dfd.promise;
    };
});