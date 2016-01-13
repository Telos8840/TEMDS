angular.module('temds.app.services')


.service('DeliveryService', function ($http, $q, $localstorage) {

    /**
     * Get a list of Deliveries (Offer History)
     * @param pageNumber
     * @returns {*}
     */
    this.getDeliveryHistoryList = function (pageNumber) {
        var dfd = $q.defer();
        var uId = $localstorage.getObject('user').id;

        $http.get(_API_HOST_ + 'api_goes_here/' + uId + '/' + pageNumber)
            .success(function (response) {

            }).catch(function (response) {
                console.log(response);
            });

        return dfd.promise;
    }


    /**
     * Create delivery
     * delivery {
     *     uId
     *     deliveryAddress
     *     orders
     *     status
     * }
     * @param delivery
     * @returns {*}
     */
    this.createDelivery = function (delivery) {
        var dfd = $q.defer();
        console.log("Creating Delivery!");
        console.log(JSON.stringify(delivery));

        $http.post(_API_HOST_ + 'api/delivery/addDelivery', delivery)
            .success(function (response) {
                dfd.resolve(response);
                $localstorage.setObject('delivery', {});
            }).catch(function (response) {
                console.log(response);
            });

        return dfd.promise;
    }


});