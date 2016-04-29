/**
 * Created by GLee on 3/31/16.
 */

'use strict';
angular.module('const', [])
    .constant('appParams', {
        /**
         * Order Status
         * NOTE: Make sure to update these as new status gets defined
         */
        OrderStatus: {
            Unknown: -1,
            Created: 0,
            Processing: 1,
            InProgress: 2,
            Delivered: 3,
            Denied: 4,
            Cancelled: 5,
            OnHold: 6
        },

        /**
         * Application Constant Variables
         */
        Constants: {
            NOTIFICATION_AUTO_CLOSE_TIMEOUT: 5000
        }
    });
