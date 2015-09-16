angular.module('temds.app.services')


.service('AddressBookService', function ($http, $q) {


    this.getAddressList = function (page, userid) {
        var pageSize = 10, // set your page size, which is number of records per page
            skip = pageSize * (page - 1),
            totalPosts = 1,
            totalPages = 1,
            dfd = $q.defer();

        userid = userid ? userid : '55f8e4d43869c70e00b7a8bb';

        //$http.get('data/sample_addressbook.json').success(function (database) {
        $http.get(_API_HOST_ + 'api/user/getAddresses/' + userid +
            '/' + pageSize + '/' + page).success(function (database) {
            dfd.resolve(database);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve({
                addressList: [],
                totalPages: 0
            })
        });

        return dfd.promise;
    };

});