"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchDesigns = searchDesigns;

var _designModel = require("../../models/design-model");

var _designModel2 = _interopRequireDefault(_designModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchDesigns(req, res) {
    _designModel2.default.aggregate([{
        $search: {
            "compound": {
                "must": [{
                    "text": {
                        "query": ["cherry", "japan"],
                        "path": ["title", "tags"]
                    }
                }],
                "filter": [{
                    "text": {
                        "query": "hat",
                        "path": "type"
                    }
                }]
            }
        }
    }, {
        $skip: 0
    }, {
        $limit: 12
    }], function (error, designs) {
        if (error) {
            return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
        }
        return res.status(200).json({ designs: designs });
    });
}