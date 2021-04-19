'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requireLogin = requireLogin;
exports.getUserId = getUserId;

var _firebase = require('../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//make sure the user is logged in to make certain requests
function requireLogin(req, res, next) {
    verifyToken(req).then(function () {
        next();
    }).catch(function () {
        return res.status(401).send('You must be logged in');
    });
}

function getUserId(req) {
    return new Promise(function (resolve, reject) {
        verifyToken(req).then(function (token) {
            resolve(token.uid);
        }).catch(function () {
            reject();
        });
    });
}

function verifyToken(req) {
    return new Promise(function (resolve, reject) {
        var token = req.headers.authorization || req.headers['authorization'];
        if (!token) {
            reject();
        }
        _firebase2.default.auth().verifyIdToken(token).then(function (decodedToken) {
            resolve(decodedToken);
        }).catch(function () {
            reject();
        });
    });
}