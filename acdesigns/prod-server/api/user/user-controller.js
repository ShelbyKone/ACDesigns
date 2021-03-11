'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = createUser;

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUser(req, res) {
    // check for empty values
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