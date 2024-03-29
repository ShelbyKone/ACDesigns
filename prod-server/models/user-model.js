'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    _id: String,
    islandRep: String,
    islandName: String,
    creatorCode: String,
    about: String,
    image: String,
    imageVersion: Number,
    favorites: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Design' }]
});

exports.default = _mongoose2.default.model('User', userSchema);