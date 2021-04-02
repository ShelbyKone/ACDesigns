'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFavorites = getFavorites;
exports.addFavorite = addFavorite;
exports.deleteFavorite = deleteFavorite;

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFavorites(req, res) {}

function addFavorite(req, res) {}

function deleteFavorite(req, res) {}