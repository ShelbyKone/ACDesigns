'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _designController = require('./design-controller');

var controller = _interopRequireWildcard(_designController);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var upload = (0, _multer2.default)({ dest: 'uploads/' });

//return a design by id
router.get('/design/:id', controller.getDesign);

//return all designs by a specific user
router.get('/user/:id/designs', controller.getUserDesigns);

//return all designs by query string
router.get('/designs', controller.getDesigns);

//update a design
router.put('/design', auth.requireLogin, upload.single('image'), controller.updateDesign);

//create a design
router.post('/design', auth.requireLogin, upload.single('image'), controller.createDesign);

//delete a design
router.delete('/design/:id', auth.requireLogin, controller.deleteDesign);

exports.default = router;