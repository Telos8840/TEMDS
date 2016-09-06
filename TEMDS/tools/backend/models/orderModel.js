/**
 * Created by GLee on 3/26/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    confirmationNumber: {
        type: String,
        required: true
    },
    uId: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        default: '',
        required: false
    },
    orders: {
        type: Object,
        default: {},
        required: false
    },
    driver: {
        type: Object,
        default: {},
        required: false
    },
    deliveryAddress: {
        type: Object,
        default: {},
        required: false
    },
    status: {
        type: Number,
        required: true
    },
    insertDate: {
        type: Date,
        default: Date.now,
        required: false
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model('deliveries', OrderSchema);