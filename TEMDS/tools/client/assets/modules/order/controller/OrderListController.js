/**
 * Created by GLee on 3/26/16.
 */
'use strict';

angular.module('order')
    .controller('OrderListController', function($scope, $timeout, OrderFactory, helper, appParams, NotificationFactory) {
        const FILTER_SWITCH_FETCH_LIMIT_TIME = 500;
        const VISIBLE_PAGE_COUNT_PER_SIDE = 3; // excludes first and last
        var _filterTimeout;

        // TEMP
        var notification = new NotificationFactory({
            id: 'orderNotification',
            position: 'top-middle'
        });

        /**
         * Fetch list of orders
         */
        function getOrderList() {
            OrderFactory.GetOrderList($scope.pageNumber, $scope.itemsPerPage, $scope.listOptions)
                .then(function(data) {
                    $scope.orderList  = data.list;
                    $scope.totalItems = data.total;
                    $scope.pageNumber = data.page;
                    processPagination();
                    //console.log('orderList>\n', $scope.orderList); //TODO: DELETE
                });
        }

        /**
         * Set filters/sort to default status
         */
        function setDefault() {
            $scope.itemsPerPageOptions = [20, 50, 100, 200];
            $scope.itemsPerPage = $scope.itemsPerPageOptions[0];
            $scope.pageNumber = 0;
            $scope.itemCounts = 0;
            $scope.search = "";

            $scope.status = [];
            for (var s in appParams.OrderStatus) {
                if (s != 'Unknown')
                $scope.status.push( {
                    status: helper.camelToNormalString(s, true),
                    code: appParams.OrderStatus[s],
                    addFilter: false
                });
            }

            $scope.listOptions = {
                sortByAsc: false,
                sortBy: 'insertDate',
                filters: []
            };

            getOrderList();
        }

        /**
         * Create pagination
         */
        function processPagination() {
            $scope.pagination = [];

            if ($scope.totalItems === 0) {
                $scope.totalPages = 0;
                $scope.pageNumber = 0;
                $scope.hasPrevious = false;
                $scope.hasNext = false;
            } else {
                $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage) - 1;
                $scope.pageNumber = Math.min($scope.pageNumber, $scope.totalPages);

                var paginationCutoffs = getBegEndOfPagination();

                $scope.hasPrevious = paginationCutoffs.beg > 1;
                $scope.hasNext = paginationCutoffs.end < $scope.totalPages - 1;

                for (var i = paginationCutoffs.beg; i <= paginationCutoffs.end; i++)
                    $scope.pagination.push(i);
            }
        }

        /**
         * Calculate the beginning of visible page number
         * and end of visible page number, excluding first
         * page and last page.
         * @returns {{beg: number, end: number}}
         */
        function getBegEndOfPagination() {
            var visiblePgTotalCount = VISIBLE_PAGE_COUNT_PER_SIDE * 2;
            var beg = 1, end = $scope.totalPages - 1;

            if ($scope.totalPages > visiblePgTotalCount) {
                // 0 ... (VISIBLE_PAGE_COUNT_PER_SIDE-1)
                if ($scope.pageNumber < VISIBLE_PAGE_COUNT_PER_SIDE + 1) {
                    var nextAvailablePgCount = visiblePgTotalCount - ($scope.pageNumber - VISIBLE_PAGE_COUNT_PER_SIDE) - 2;
                    end = Math.min($scope.pageNumber + nextAvailablePgCount, $scope.totalPages - 1);
                }
                // (Total - VISIBLE_PAGE_COUNT_PER_SIDE) ... Total
                else if ($scope.pageNumber >= ($scope.totalPages - VISIBLE_PAGE_COUNT_PER_SIDE)) {
                    var prevAvailablePgCount = visiblePgTotalCount - ($scope.totalPages - $scope.pageNumber - 1);
                    beg = Math.max($scope.pageNumber - prevAvailablePgCount, 1);
                }
                // Somewhere in the center
                else {
                    beg = Math.max($scope.pageNumber - VISIBLE_PAGE_COUNT_PER_SIDE, 1);
                    end = Math.min($scope.pageNumber + VISIBLE_PAGE_COUNT_PER_SIDE, $scope.totalPages - 1);
                }
            }

            return {beg: beg, end: end};
        }

        setDefault();



        // Scope Methods

        /**
         * Set/Change status filter
         * _filterTimeout is used to limit the calls in
         *     FILTER_SWITCH_FETCH_LIMIT_TIME ms.
         * from ngClick(index of status in $scope.status)
         * @param index
         */
        $scope.setFilter = function(index){
            if (_filterTimeout) $timeout.cancel(_filterTimeout);
            $scope.pageNumber = 0;
            $scope.status[index].addFilter = !$scope.status[index].addFilter;
            var newFilter = [];

            for (var s in $scope.status) {
                if ($scope.status[s].addFilter)
                    newFilter.push($scope.status[s].code);
            }

            $scope.listOptions.filters = newFilter;
            _filterTimeout = $timeout(getOrderList, FILTER_SWITCH_FETCH_LIMIT_TIME);
        };

        /**
         * Go to index(starts with 0) page
         * @param index
         */
        $scope.goToPage = function(index) {
            console.log(index);
            if (index != $scope.pageNumber) {
                $scope.pageNumber = Math.min(Math.max(index, 0), $scope.totalPages);
                getOrderList();
            }
        };

        /**
         * Skip n many pages
         * @param isForward
         */
        $scope.skipPages = function(isForward) {
            var paginationCutoffs = getBegEndOfPagination();

            if (isForward) {
                this.goToPage(paginationCutoffs.end + 1);
            } else {
                this.goToPage(paginationCutoffs.beg - 1);
            }
        };

        /**
         * Fetch the list again, starting from index 0 page
         */
        $scope.refreshPage = function() {
            $scope.pageNumber = 0;
            getOrderList();
        };

        /**
         * Search order by confirmation number
         */
        $scope.searchOrder = function() {
            var confirmationNumber = $scope.search;
            console.log(confirmationNumber);
            //TODO: bind to order detail page when finished
            notification.addNotification({
                title: 'TODO',
                content: 'Bind to order detail page when finished.\n Confirmation #'+confirmationNumber,
                autoclose: 3000
            });
            $scope.search = '';
        };

        /**
         * Passthrough method to helper.camelToNormalizeString
         * @param str
         * @returns {*}
         */
        $scope.getStatusDescription = function(code) {
            for (var s in appParams.OrderStatus) {
                if (code == appParams.OrderStatus[s])
                    return helper.camelToNormalString(s, true).trim();
            }

            return "Unknown";
        };

        /**
         * Order status colors are defined in _colors.scss
         * @param code
         * @returns {string}
         */
        $scope.getStatusColorClassByCode = function(code) {
            var status = this.getStatusDescription(code)
                .toLowerCase().replace(/\s/g,'_',true);
            return 'color_order_status_' + status;
        };

        $scope.formatDate = function(date) {
            return helper.formatTimestamp(date);
        }

    });