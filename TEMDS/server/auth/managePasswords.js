/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 8/30/15
 * Time: 6:30 PM
 */

//https://www.npmjs.com/package/bcrypt-nodejs
var bcrypt = require('bcrypt-nodejs');

module.exports.cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, null, function (err, hash) {
      return callback(err, hash);
    });

  });
};

module.exports.comparePassword = function (password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
    if (err)
      return callback(err);
    return callback(null, isPasswordMatch);
  });
};