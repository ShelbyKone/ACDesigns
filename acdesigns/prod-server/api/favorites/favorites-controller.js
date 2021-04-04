'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFavorites = getFavorites;
exports.addFavorite = addFavorite;
exports.deleteFavorite = deleteFavorite;

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _designModel = require('../../models/design-model');

var _designModel2 = _interopRequireDefault(_designModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFavorites(req, res) {
    _userModel2.default.find({ _id: req.params.userId }, 'favorites', function (error, designs) {
        if (error) {
            return res.status(500).send('Error getting users favorites'); //status: internal server error
        }
        return res.status(200).json({ designs: designs });
    }).populate('favorites');
}

function addFavorite(req, res) {
    _userModel2.default.updateOne({ _id: req.params.userId }, { $addToSet: { favorites: req.params.designId } }, function (error) {
        if (error) {
            return res.status(500).send('Error adding design to favorites'); //status: internal server error
        }
        _designModel2.default.updateOne({ _id: req.params.designId }, { $inc: { likes: 1 } }, function (error) {
            if (error) {
                return res.status(500).send('Error adding design to favorites'); //status: internal server error
            }
            return res.status(204).send(); //status: success, no content
        });
    });
}

function deleteFavorite(req, res) {
    _userModel2.default.updateOne({ _id: req.params.userId }, { $pull: { favorites: req.params.designId } }, function (error) {
        if (error) {
            return res.status(500).send('Error removing design from favorites'); //status: internal server error
        }
        _designModel2.default.updateOne({ _id: req.params.designId }, { $inc: { likes: -1 } }, function (error) {
            if (error) {
                return res.status(500).send('Error adding design to favorites'); //status: internal server error
            }
            return res.status(204).send(); //status: success, no content
        });
    });
}