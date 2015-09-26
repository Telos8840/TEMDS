angular.module('temds.app.services')


.service('AddressBookService', function ($http, $q, $localstorage, $filter) {


    /**
     * Get Address List for local storage
     * @returns {Array} Addresses
     */
    this.loadAddressList = function () {
        var addressList = $localstorage.getObject('user').address;
        return $filter('orderBy')(addressList, '+name', false);
    }

    /**
     * Get Address List from the server.
     * TO BE DEPRECATED * * * * * * * * * * * * * * * * * 
     * @param   {Number} page   Page number
     * @param   {String} userid User Id
     * @returns {Object} Array of address and total page
     */
    this.getAddressList = function (userid) {
        var dfd = $q.defer();
        var user = $localstorage.getObject('user');

        $http.get(_API_HOST_ + 'api/user/getAddresses/' + userid)
            .success(function (response) {
                response = $filter('orderBy')(response, '+name', false);
                user.address = response;
                $localstorage.setObject('user', user);
                dfd.resolve(response);
            }).catch(function (response) {
                console.log(response);
                user.address = [];
                $localstorage.setObject('user', user);
                dfd.resolve([]);
            });

        return dfd.promise;
        /*
        var pageSize = 10, // set your page size, which is number of records per page
            skip = pageSize * (page - 1),
            totalPosts = 1,
            totalPages = 1,
            dfd = $q.defer();

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
        */
    };


    this.updateAddress = function (address) {
        var dfd = $q.defer();
        var user = $localstorage.getObject('user');

        console.log(address);

        $http.put(_API_HOST_ + 'api/user/update/address', {
                userId: user.id, // user id
                addressId: address.id,
                name: address.name, // address name
                addr1: address.addr1, // address line 1
                addr2: address.addr2, // address line 2 (ste/fl/apt)
                city: address.city, // city       
                state: address.state, // state
                zipcode: address.zipcode, // zipcode
                primary: address.primary // primary address
            })
            .success(function (response) {
                console.log(response);
                // Update local
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
        var user = $localstorage.getObject('user');

        $http.post(_API_HOST_ + 'api/user/addAddress', {
                id: user.id,
                name: address.name,
                addr1: address.addr1,
                addr2: address.addr2,
                city: address.city,
                state: address.state,
                zipcode: address.zipcode,
                primary: address.primary
            })
            .success(function (response) {
                console.log(response); //debug use
                // update primary if needed
                if (address.primary) {
                    for (var i = 0; i < user.address.length; i++) {
                        user.address[i].primary = false;
                    }
                }
                // add address
                address.id = response.addressId;
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