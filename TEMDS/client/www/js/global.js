/* Global Variables */
var _API_HOST_ = 'http://temds.herokuapp.com/';

/* Global Helper */
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}