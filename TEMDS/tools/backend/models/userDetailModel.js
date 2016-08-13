'use strict';
/**
 * This is client user detail scehema from user-detail collection
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserDetailSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    bDay: {
        type: String,
        required: true
    },
    address: {
        type: Array,
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
}, { collection: 'user_detail' });

module.exports = mongoose.model('user_detail', UserDetailSchema);