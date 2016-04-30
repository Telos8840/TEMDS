'use strict';

var ToolsUser = rq('toolsUserModel');

module.exports.getUserById = function (req, res) {
    ToolsUser.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(400)
                .send('User not found');
        } else {
            res.json(user);
        }
    });
};
module.exports.updateUserById = function (req, res) {
    ToolsUser.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(400)
                .send('User not found');
        } else {
            user.roles = req.body.roles;
            user.username = req.body.username;
            user.email = req.body.email;
            user.updated = Date.now();
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(400)
                        .send('User could not be updated');
                } else {
                    delete user.password;
                    res.json(user);
                }
            });
        }
    });
};
module.exports.deleteUserById = function (req, res) {
    ToolsUser.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(400)
                .send('User not found');
        } else {
            user.remove(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400)
                        .send('User could not be deleted');
                } else {
                    res.json({
                        message: 'User removed successfully'
                    });
                }
            });
        }
    });
};
//list all Users except admins
module.exports.listUsers = function (req, res) {
    ToolsUser.find({})
        .where('roles')
    //uncomment to exclude users with admin or manager role from userlist
    //.nin(['admin', 'manager'])
    .select('-password')
        .exec(function (err, users) {
            if (err) {
                return res.status(400)
                    .send('You must send the username and the password');
            } else {
                res.json(users);
            }
        });
};