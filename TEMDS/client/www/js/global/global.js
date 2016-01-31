/* Global Enum */
var _SUCCESS_ = 777,
    _FAIL_ = 666,
    _ORDER_STATUS_CREATED_ = 0,
    _ORDER_STATUS_PROCESSING_ = 1,
    _ORDER_STATUS_DELIVERY_IN_PROGRESS_ = 2,
    _ORDER_STATUS_DELIVERED_ = 3,
    _ORDER_STATUS_DENIED_ = 4,
    _ORDER_STATUS_CANCELLED_ = 5,
    _ORDER_STATUS_ON_HOLD = 6;


/* Global Variables */
var _API_HOST_ = 'http://temds.herokuapp.com/';

/* Global Helper */
if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}
var _MAP_STYLE_ = [];

/**
 * Phone number auto formatter.
 * Auto formats the input to (XXX) XXX - XXXX format.
 * Allows 10 digits only.
 * @param   {String} phoneNum Phone Number String
 * @returns {Object} Formatted Phonenumber and input validity
 */
function PHONE_NUMBER_FORMATTER(phoneNum) {
    var digit = 0;
    if (phoneNum) {
        phoneNum = phoneNum.replace(/[^0-9]/g, ''); // number only
        digit = phoneNum.length;
        switch (true) {
        case (digit <= 3):
            phoneNum = phoneNum.replace(/(\d*)/, "($1");
            break;
        case (digit <= 6):
            phoneNum = phoneNum.replace(/(\d{3})/, "($1) ");
            break;
        case (digit <= 10):
            phoneNum = phoneNum.replace(/(\d{3})(\d{3})/, "($1) $2 - ");
            break;
        default:
            phoneNum = phoneNum.substring(0, 10)
                .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 - $3");
            break;
        }
    } else phoneNum = "";

    return {
        phoneNum: phoneNum,
        valid: digit >= 10
    };
}

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}