angular.module('temds.auth.services', [])

.service('RegisterService', function ($http, $q) {
    // Signup Step #1: Send confirmation email

    /**
     * Validate user email by sending an email with number. 
     * This is the 1st step to register a new user.
     * @param   {String!}  email User email address
     * @returns {Number} Status Code
     */
    this.sendEmailConfirmation = function (email) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/user/emailConfirmation', {
            email: email
        }).success(function (response) {
            dfd.resolve(response.status);
        }).catch(function (response) {
            console.log(response);
            dfd.resolve(response.status);
        });

        return dfd.promise;
    };

    /**
     * Check if confirmation number matches with the email address.
     * @param   {String!} email      User email address
     * @param   {String!} confirmNum Five digit number
     * @returns {Boolean} True on success
     */
    this.checkEmailConfirmation = function (email, confirmNum) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/user/confirmationNumber', {
            email: email,
            confirmNum: parseInt(confirmNum)
        }).success(function (response) {
            dfd.resolve(true);
        }).catch(function (response) {
            console.log(response.data.message);
            dfd.resolve(false);
        });

        return dfd.promise;
    }

    /**
     * Create new user.
     * @param   {String!} email    email address
     * @param   {String!} rawPass  raw password
     * @param   {String!} fname    first name
     * @param   {String!} lname    last name
     * @param   {String!} phoneNum phone number
     * @param   {String!} addr1    address field 1
     * @param   {String?} addr2    typically apt. ste. fl. number
     * @param   {String!} city     city/county
     * @param   {String!} state    state abbriviation
     * @param   {Number!} zipcode  zipcode
     * @returns {Boolean} true on success
     */
    this.registerNewUser = function (
        email, rawPass, fName, lName, bDay, phoneNum, addr1, addr2, city, state, zipcode) {
        var dfd = $q.defer();

        $http.post(_API_HOST_ + 'api/user/registerUser', {
            email: email,
            rawPass: rawPass,
            fName: fName,
            lName: lName,
            bDay: moment(bDay).format('MM/DD/YYYY'),
            phoneNum: phoneNum,
            address: {
                name: 'Home', // default address name
                addr1: addr1,
                addr2: addr2 ? addr2 : '',
                city: city,
                state: state.abbr,
                zipcode: zipcode,
                primary: true // this is the first address                
            }
        }).success(function (response) {
            // TODO: Save local user data here!
            // Save user uId and salt password
            dfd.resolve(true);
        }).catch(function (response) {
            console.log(response.data.message);
            dfd.resolve(false);
        });

        console.log({
            email: email,
            rawPass: rawPass,
            fName: fName,
            lName: lName,
            bDay: moment(bDay).format('MM/DD/YYYY'),
            phoneNum: phoneNum,
            address: {
                name: 'My Address', // default address name
                addr1: addr1,
                addr2: addr2 ? addr2 : '',
                city: city,
                state: state.abbr,
                zipcode: zipcode,
                primary: true // this is the first address                
            }
        });

        return dfd.promise;
    }
});