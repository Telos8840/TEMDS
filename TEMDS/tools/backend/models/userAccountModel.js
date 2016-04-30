'use strict';
/**
 * This is client user detail scehema from user-detail collection
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserAccountSchema = new Schema({
    email: {
        type: String,
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
}, { collection: 'users' });

UserAccountSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            _id: ret._id,
            email: ret.email,
            insertDate: ret.insertDate,
            modifiedDate: ret.modifiedDate
        };

        return retJson;
    }
});

module.exports = mongoose.model('users', UserAccountSchema);