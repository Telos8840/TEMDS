angular.module('temds.app.services')


.service('AddressBookService', function ($http, $q, $localstorage) {


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


    this.updateAddress = function (address) {
        var dfd = $q.defer();

        $http.put(_API_HOST + 'api.user/address') // TODO: get correct uri
            .success(function (response) {
                // Update local
                var user = $localstorage.getObject('user');
                for (var i = 0; i < user.address.length; i++) {
                    if (user.address[i].id === address.id) {
                        user.address[i] = address;
                    } else if (address.primary) {
                        user.address[i].primary = false;
                    }
                }
                $localstorage.setObject('user', user);
                dfd.resolve(_SUCCESS_);
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(response.status);
            });

        return dfd.promise;
    }

    this.addAddress = function (address) {
        var dfd = $q.defer();

        $http.put(_API_HOST + 'api.user/address') // TODO: get correct uri
            .success(function (response) {
                var newAddressId = response.id;
                // Update local
                var user = $localstorage.getObject('user');
                // update primary if needed
                if (address.primary) {
                    for (var i = 0; i < user.address.length; i++) {
                        user.address[i].primary = false;
                    }
                }
                address.id = newAddressId;
                user.address.push(address);
                $localstorage.setObject('user', user);
                dfd.resolve(_SUCCESS_);
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(response.status);
            });

        return dfd.promise;
    }

});