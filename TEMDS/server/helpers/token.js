/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 1/16/16
 * Time: 12:45 PM
 */

var jwt         = require('jsonwebtoken');
var config      = require('../config');
var response    = require('./response');
var _           = require('lodash');

module.exports.create = function (user) {
  var token = jwt.sign(user, config.secret, {
    expiresIn: 1440 // expires in 24 hours
  });
  return token;
};

module.exports.validate = function (req, res, callback) {
  if(!config.prod) callback();
  else if(config.prod && req.headers.temdstoken) { // decoded returns back object that was initially signed with token
    jwt.verify(req.headers.temdstoken, config.secret, function(err, decoded) {
      if (err) response.unauthorized(res);
      else callback();
    });
  } else {
    response.invalid(res, "No token provided");
  }
};