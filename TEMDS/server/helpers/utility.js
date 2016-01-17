/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 1/16/16
 * Time: 10:42 PM
 */

module.exports.addTimestamp = function (param) {
  param.insertDate = new Date();
  param.modifiedDate = new Date();
  return param;
};