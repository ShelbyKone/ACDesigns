'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _aws = require('../../config/aws');

var _aws2 = _interopRequireDefault(_aws);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create the user in the database 
function createUser(req, res) {
    //check for empty values
    if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
        res.statusMessage = 'Include all required fields.';
        return res.status(400).end(); //status: bad request
    }

    //create the user
    var user = new _userModel2.default({
        _id: req.body._id,
        islandRep: req.body.islandRep,
        islandName: req.body.islandName,
        creatorCode: '',
        about: '',
        image: '',
        favorites: []
    });

    //save the user to the db
    user.save(function (error) {
        if (error) {
            if (error.code === 11000) {
                res.statusMessage = 'A user with this ID already exists.';
                return res.status(403).end(); //status: forbidden
            }
            console.log(error);
            res.statusMessage = "Registration failed.";
            return res.status(500).end(); //status: internal server error
        }
        return res.status(201).json(); //status: success, created
    });
}

//get a user by their id
function getUser(req, res) {
    _userModel2.default.findOne({ _id: req.params.id }, function (error, user) {
        if (error) {
            res.statusMessage = "Error retrieving user from database.";
            return res.status(500).end(); //status: internal server error
        }
        if (!user) {
            res.statusMessage = 'No user with id ' + req.params.id + ' found.';
            return res.status(404).end(); //status: not found
        }
        return res.status(200).json({ user: user }); //status: success
    });
}

//update a users profile
function updateUser(req, res) {
    var user = new _userModel2.default(req.body);

    auth.getUserId(req).then(function (id) {
        //get the users id
        if (id == user._id) {
            //only allow the user who made the request to update their own profile
            if (req.file) {
                //if theres an image, upload it to s3 then update the user

                if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                    //if the file is not an image
                    _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                    res.statusMessage = 'File must be of type .jpeg or .png';
                    return res.status(422).end(); //status: Unprocessable Entity
                }

                var s3 = new _aws2.default.S3();

                var params = {
                    ACL: 'public-read',
                    Bucket: process.env.BUCKET_NAME,
                    Body: _fs2.default.createReadStream(req.file.path),
                    Key: 'profileImage/' + user._id,
                    ContentType: req.file.mimetype
                };

                s3.upload(params, function (err, data) {
                    if (err) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                        res.statusMessage = 'Error uploading file.';
                        return res.status(500).end(); //status: internal server error
                    }
                    if (data) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder

                        user.image = data.Location;
                        _userModel2.default.findOneAndUpdate({ _id: user._id }, user, function (error) {
                            if (error) {
                                res.statusMessage = 'Server Error';
                                return res.status(500).end(); //status: internal server error
                            }
                            return res.status(204).json(); //status: success, no content
                        });
                    }
                });
            } else {
                //update the user without uploading an image
                _userModel2.default.findOneAndUpdate({ _id: user._id }, user, function (error) {
                    if (error) {
                        res.statusMessage = 'Server Error';
                        return res.status(500).end(); //status: internal server error
                    }
                    return res.status(204).json(); //status: success, no content
                });
            }
        } else {
            //if the token user id doesn't match the request user id
            res.statusMessage = 'You are not authorized to make this request.';
            return res.status(401).end(); //status: unauthorized
        }
    }).catch(function (error) {
        //if unable to get users id
        res.statusMessage = 'Unable to get user id';
        return res.status(500).end(); //status: internal server error
    });
}