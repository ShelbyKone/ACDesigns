"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchDesigns = searchDesigns;

var _designModel = require("../../models/design-model");

var _designModel2 = _interopRequireDefault(_designModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchDesigns(req, res) {
    //get the query parameters
    var page = req.query.page ? parseInt(req.query.page) : 0;
    var term = req.query.term ? req.query.term : " ";
    var filter = req.query.filter ? req.query.filter : "all";
    //set the skip/limit for pagination
    var limit = 12;
    var skip = limit * page;

    if (filter == 'all') {
        _designModel2.default.aggregate([{
            $search: {
                "text": {
                    "query": term,
                    "path": ["title", "tags"]
                }
            }
        }, { $skip: skip }, { $limit: limit }], function (error, designs) {
            if (error) {
                return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
            }
            return res.status(200).json({ designs: designs });
        });
    } else {
        _designModel2.default.aggregate([{
            $search: {
                "compound": {
                    "must": [{
                        "text": {
                            "query": term,
                            "path": ["title", "tags"]
                        }
                    }],
                    "filter": [{
                        "text": {
                            "query": filter,
                            "path": "type"
                        }
                    }]
                }
            }
        }, { $skip: skip }, { $limit: limit }], function (error, designs) {
            if (error) {
                return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
            }
            return res.status(200).json({ designs: designs });
        });
    }
}