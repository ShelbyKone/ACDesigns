'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserId = exports.requireLogin = undefined;

var _firebase = require('../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//make sure the user is logged in to make certain requests
var requireLogin = exports.requireLogin = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res, next) {
        var token;
        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return verifyToken(req);

                    case 2:
                        token = _context.sent;

                        if (token) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', res.status(401).json({ message: 'You must be logged in' }));

                    case 5:
                        next();

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function requireLogin(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var getUserId = exports.getUserId = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req) {
        var token;
        return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return verifyToken(req);

                    case 2:
                        token = _context2.sent;

                        if (token) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', null);

                    case 7:
                        return _context2.abrupt('return', token.uid);

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getUserId(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

function verifyToken(req) {
    var token = req.headers.authorization || req.headers['authorization'];
    if (!token) {
        return null;
    }
    _firebase2.default.auth().verifyIdToken(idToken).then(function (decodedToken) {
        return decodedToken;
    }).catch(function () {
        return null;
    });
}