angular.module('temds.app.services')


.service('VenueService', function ($http, $q) {

    // TODO: Implement this with backend api
    this.getVenueList = function () {
        var dfd = $q.defer();

        $http.get(_API_HOST_ + 'api/venue/')
            .success(function (response) {

                dfd.resolve(response);
            }).catch(function (response) {
                console.log(response);

                dfd.resolve([]);
            });

        return dfd.promise;
    }

    // TEMP DATA
    // TODO: Load it from local storage if exists.
    this.loadVenueList = function () {
        var dfd = $q.defer();

        $http.get('data/sample_venuelist.json')
            .success(function (response) {
                dfd.resolve(response);
            });

        return dfd.promise;
    }

    // TODO: use api
    this.getVenueDetail = function (venueId) {
        var dfd = $q.defer();

        $http.get('data/sample_venuedetail.json')
            .success(function (response) {
                dfd.resolve(response);
            });

        return dfd.promise;
    }

});