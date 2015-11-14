angular.module('temds.app.services')


.service('VenueService', function ($http, $q, $localstorage) {

    // TODO: Implement this with backend api
    this.getVenueList = function () {
        var dfd = $q.defer();
        var venues = $localstorage.getObject('venues');

        $http.get(_API_HOST_ + 'api/venue/list/' + (venues ? venues.timestamp : ''))
            .success(function (response) {
                if (response) {
                    $localstorage.setObject('venues', response);
                    dfd.resolve(response);
                } else {
                    dfd.resolve(venues);
                }
            }).catch(function (response) {
                console.log(response);
                dfd.resolve(venues);
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