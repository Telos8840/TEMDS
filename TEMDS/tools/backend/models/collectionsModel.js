/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 11/8/15
 * Time: 4:49 PM
 */

'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CollectionsSchema = new Schema({
  users: {
    type: Date,
    default: Date.now
  },
  user_detail: {
    type: Date,
    default: Date.now
  },
  pending_users: {
    type: Date,
    default: Date.now
  },
  venues: {
    type: Date,
    default: Date.now
  },
  venue_details: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('collections_updated', CollectionsSchema, 'collections_updated');