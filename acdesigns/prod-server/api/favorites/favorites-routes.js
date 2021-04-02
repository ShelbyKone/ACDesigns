'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _favoritesController = require('./favorites-controller');

var controller = _interopRequireWildcard(_favoritesController);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//return all designs from a users favorites
router.get('/user/:id/favorites', controller.getFavorites);

//add a design to a users favorites
router.post('/user/:id/favorites/:designId', auth.requireLogin, controller.addFavorite);

//delete a design
router.delete('/user/:id/favorites/:designId', auth.requireLogin, controller.deleteFavorite);

exports.default = router;