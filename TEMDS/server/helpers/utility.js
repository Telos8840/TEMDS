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

module.exports.orderStatus = {
  created: 0,
  processing: 1,
  inRoute: 2,
  delivered: 3,
  denied: 4,
  canceled: 5,
  onHold: 6
};