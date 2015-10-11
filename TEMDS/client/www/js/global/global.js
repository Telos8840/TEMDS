/* Global Enum */
var _SUCCESS_ = 777;

/* Global Variables */
var _API_HOST_ = 'http://temds.herokuapp.com/';

/* Global Helper */
if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}

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