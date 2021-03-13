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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
            return res.status(500).json(); //status: internal server error
        }
        if (!user) {
            res.statusMessage = 'No user with id ' + req.params.id + ' found.';
            return res.status(404).json(); //status: not found
        }
        return res.status(200).json({ user: user }); //status: success
    });
}

//update a users profile
function updateUser(req, res) {
    var s3 = new _aws2.default.S3();

    var params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: _fs2.default.createReadStream(req.file.path),
        Key: 'profileImage/' + req.file.originalname
    };

    s3.upload(params, function (err, data) {
        if (err) {
            res.statusMessage = "Error uploading file to S3 bucket.";
            return res.status(500).json(); //status: internal server error
        }
        if (data) {
            console.log('File uploaded');
            return res.status(200).json(); //status: success
        }
    });
}