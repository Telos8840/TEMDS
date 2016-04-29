/**
 * Created by GLee on 4/28/16.
 */
'use strict';
var mongoose = require('mongoose'),
    UserDetail = rq('userDetailModel');

/**
 * Get user detail by user id
 * @param req
 * @param res
 * @constructor
 */
module.exports.GetUserById = function (req, res) {
    var uId =  mongoose.Types.ObjectId(req.params.id);

    UserDetail
        .findOne({userKey: uId})
        .exec(function(err, user) {
            if (err) {
                return res.status(400).send('User not found');
            } else {
                if (user === null)
                    return res.status(404)
                        .send ('Error on GetUserById: Unable to find user with id "' + uId + '"');

                return res.status(200).json(user);
            }
        });
}