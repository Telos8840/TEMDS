/**
 * Created by GLee on 4/28/16.
 */
'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    UserDetail = rq('userDetailModel'),
    UserAccount = rq('userAccountModel');

/**
 * Get user detail by user id
 * @param req
 * @param res
 * @constructor
 */
module.exports.GetUserDetailById = function (req, res) {
    var uId =  mongoose.Types.ObjectId(req.params.id);

    UserDetail
        .findOne({userKey: uId})
        .exec(function(err, user) {
            if (err) {
                return res.status(400).send('User not found');
            } else {
                if (user === null)
                    return res.status(404)
                        .send ('Error on GetUserDetailById: Unable to find user with id "' + uId + '"');

                return res.status(200).json(user);
            }
        });
};

/**
 * Get user account info by user id
 * @param req
 * @param res
 * @constructor
 */
module.exports.GetUserAccountById = function (req, res) {
    var uId =  mongoose.Types.ObjectId(req.params.id);

    UserAccount
        .findOne({_id: uId})
        .exec(function(err, user) {
            if (err) {
                return res.status(400).send('User not found');
            } else {
                if (user === null)
                    return res.status(404)
                        .send ('Error on GetUserAccountById: Unable to find user with id "' + uId + '"');

                return res.status(200).json(user);
            }
        });
}

/**
 * Get full user info by user id
 * @param req
 * @param res
 * @constructor
 */
module.exports.GetUserById = function (req, res) {
    var uId =  mongoose.Types.ObjectId(req.params.id);

    UserAccount
        .findOne({_id: uId})
        .exec(function(err, user) {
            if (err) {
                return res.status(400).send('User not found');
            } else {
                if (user === null)
                    return res.status(404)
                        .send ('Error on GetUserById: Unable to find user with id "' + uId + '"');

                UserDetail
                    .findOne({userKey: uId})
                    .exec(function(err, detail) {
                        if (err)
                            return res.status(400).send('User detail not found');

                        if (detail === null)
                            return res.status(404)
                                .send('Error on GetUserById: Unable to find user with id "' + uId + '"');

                        var u = _.extend(user.toJSON(), detail.toJSON());
                        return res.status(200).json(u);
                    });
            }
        });
}

