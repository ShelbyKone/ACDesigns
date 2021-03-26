'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerRoutes = registerRoutes;

var _userRoutes = require('./api/user/user-routes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _designRoutes = require('./api/design/design-routes');

var _designRoutes2 = _interopRequireDefault(_designRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerRoutes(app) {
    app.use('/api', _userRoutes2.default);
    app.use('/api', _designRoutes2.default);
}