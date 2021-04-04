'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var designSchema = new _mongoose2.default.Schema({
    user: { type: String, ref: 'User' },
    designCode: String,
    image: String,
    title: String,
    description: String,
    type: String,
    tags: [String],
    likes: [String]
});

exports.default = _mongoose2.default.model('Design', designSchema);