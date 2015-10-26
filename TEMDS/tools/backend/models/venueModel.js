/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 10/20/15
 * Time: 10:06 PM
 */
'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var VenueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  img: {
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
});
module.exports = mongoose.model('venue', VenueSchema);