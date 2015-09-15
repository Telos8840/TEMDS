angular.module('temds.app.services')


.service('AddressBookService', function ($http, $q) {


    this.getAddressList = function (page, userid) {
        var pageSize = 10, // set your page size, which is number of records per page
            skip = pageSize * (page - 1),
            totalPosts = 1,
            totalPages = 1,
            dfd = $q.defer();

        userid = userid ? userid : '55f651ad0b2c96c9044c1e5e';

        //$http.get('data/sample_addressbook.json').success(function (database) {
        $http.get(_API_HOST_ + 'api/user/getAddresses/' + userid +
            '/' + pageSize + '/' + page).success(function (database) {

            console.log(database);

            totalPosts = database.length;
            totalPages = totalPosts / pageSize;

            var addressList = database.slice(skip, skip + pageSize);

            dfd.resolve({
                addressList: addressList,
                totalPages: totalPages
            });
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