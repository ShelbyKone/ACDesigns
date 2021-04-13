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

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create the user in the database 
function createUser(req, res) {
    //check for empty required values
    if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
        return res.status(400).send('Include all required fields'); //status: bad request
    }
    //create the user
    var user = new _userModel2.default({
        _id: req.body._id,
        islandRep: req.body.islandRep,
        islandName: req.body.islandName,
        creatorCode: '',
        about: '',
        image: '',
        imageVersion: 1,
        favorites: []
    });
    //save the user to the db
    user.save(function (error) {
        if (error) {
            if (error.code === 11000) {
                return res.status(403).send('A user with this ID already exists'); //status: forbidden
            }
            console.log(error);
            return res.status(500).send('Server error: registration failed'); //status: internal server error
        }
        return res.status(201).json(); //status: success, created
    });
}

//get a user by their id
function getUser(req, res) {
    _userModel2.default.findOne({ _id: req.params.id }, function (error, user) {
        if (error) {
            return res.status(500).send('Error retrieving user from database'); //status: internal server error
        }
        if (!user) {
            return res.status(404).send('No user with id ' + req.params.id + ' found'); //status: not found
        }
        return res.status(200).json({ user: user }); //status: success
    });
}

//update a users profile
function updateUser(req, res) {
    auth.getUserId(req).then(function (id) {
        //create the user
        var user = req.body;

        //only allow the user who made the request to update their own profile
        if (id != user._id) {
            return res.status(401).send('You are not authorized to make this request'); //status: unauthorized
        }
        //check for empty required values
        if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
            return res.status(400).send('Include all required fields'); //status: bad request
        }
        //if theres an image, upload it to s3 then update the user
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png'); //status: Unprocessable Entity
            }
            //update the image version (to refresh the cache)
            user.imageVersion++;

            //resize the image
            (0, _sharp2.default)(req.file.path).resize(150, 150).jpeg({ quality: 90 }).toBuffer().then(function (buff) {
                //upload the image to s3
                var s3 = new _aws2.default.S3();
                var params = {
                    ACL: 'public-read',
                    Bucket: process.env.BUCKET_NAME,
                    Body: buff,
                    Key: 'profileImage/' + user._id,
                    ContentType: 'image/jpeg'
                };
                s3.upload(params, function (err, data) {
                    if (err) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                        return res.status(500).send('Error uploading file'); //status: internal server error
                    }
                    if (data) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                        //update the user in the db
                        user.image = data.Location;
                        _userModel2.default.findOneAndUpdate({ _id: user._id }, { $set: user }, function (error) {
                            if (error) {
                                return res.status(500).send('Server error: unable to update user'); //status: internal server error
                            }
                            return res.status(204).json(); //status: success, no content
                        });
                    }
                });
            }).catch(function () {
                //if sharp fails
                if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                return res.status(500).send('Error updating user'); //status: internal server error
            });
        }
        //update the user without uploading an image
        else {
                _userModel2.default.findOneAndUpdate({ _id: user._id }, { $set: user }, function (error) {
                    if (error) {
                        return res.status(500).send('Server error: unable to update user'); //status: internal server error
                    }
                    return res.status(204).json(); //status: success, no content
                });
            }
    }).catch(function () {
        //if unable to get users id
        return res.status(500).send('Unable to get user id'); //status: internal server error
    });
}