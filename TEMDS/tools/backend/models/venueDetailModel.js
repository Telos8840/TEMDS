/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/20/15
 * Time: 11:08 PM
 */
'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var VenueDetailSchema = new Schema({
  venueId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  address: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [],
    required: true
  },
  hours: {
    type: Schema.Types.Mixed,
    required: true
  },
  insertDate: {
    type: Date,
    default: Date.now,
    requiried: false
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
    required: false
  }
});
module.exports = mongoose.model('venue_detail', VenueDetailSchema);