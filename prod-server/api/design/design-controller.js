'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDesign = getDesign;
exports.getUserDesigns = getUserDesigns;
exports.getDesigns = getDesigns;
exports.updateDesign = updateDesign;
exports.createDesign = createDesign;
exports.deleteDesign = deleteDesign;

var _designModel = require('../../models/design-model');

var _designModel2 = _interopRequireDefault(_designModel);

var _aws = require('../../config/aws');

var _aws2 = _interopRequireDefault(_aws);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sharp2.default.cache({ files: 0 });

function getDesign(req, res) {
    _designModel2.default.findOne({ _id: req.params.id }, function (error, design) {
        if (error) {
            return res.status(500).send('Error retrieving design from database.'); //status: internal server error
        }
        if (!design) {
            res.statusMessage = 'No design with id ' + req.params.id + ' found.';
            return res.status(404).send('No design with id ' + req.params.id + ' found'); //status: not found
        }
        return res.status(200).json({ design: design }); //status: success
    }).populate('user');
}

function getUserDesigns(req, res) {
    _designModel2.default.find({ user: req.params.id }, null, { sort: { createdAt: -1 } }, function (error, designs) {
        if (error) {
            return res.status(500).send('Error retrieving users designs from database.'); //status: internal server error
        }
        return res.status(200).json({ designs: designs }); //status: success
    });
}

function getDesigns(req, res) {
    //get the query parameters
    var page = req.query.page ? parseInt(req.query.page) : 0;
    var sort = req.query.sort ? req.query.sort : 'new';
    //set the skip/limit for pagination
    var limit = 12;
    var skip = limit * page;

    if (sort == 'popular') {
        _designModel2.default.aggregate([{
            $project: {
                title: true,
                description: true,
                type: true,
                image: true,
                imageVersion: true,
                user: true,
                tags: true,
                designCode: true,
                createdAt: true,
                likes: true,
                length: { $size: "$likes" }
            }
        }, { $sort: { length: -1, createdAt: -1 } }, { $skip: skip }, { $limit: limit }], function (error, designs) {
            if (error) {
                return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
            }
            return res.status(200).json({ designs: designs });
        });
    } else {
        //sort by new
        _designModel2.default.find({}, null, { sort: { createdAt: -1 }, limit: limit, skip: skip }, function (error, designs) {
            if (error) {
                return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
            }
            return res.status(200).json({ designs: designs });
        });
    }
}

function updateDesign(req, res) {
    auth.getUserId(req).then(function (userId) {
        //get the users id
        //only allow the user who made the request to update their own designs
        if (userId != req.body.user) {
            return res.status(401).send('You are not authorized to make this request'); //status: unauthorized
        }
        //check for empty required values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags) {
            if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            return res.status(400).send('Include all required fields'); //status: bad request
        }
        //set the environment type
        var environment = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';

        //create the design
        var design = req.body;
        design.tags = JSON.parse(design.tags);

        //if theres an image, upload it to s3 then update the design
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png'); //status: Unprocessable Entity
            }
            //update the image version (to refresh the cache)
            design.imageVersion++;

            //resize the image
            (0, _sharp2.default)(req.file.path).resize(500, 281).jpeg({ quality: 90 }).toBuffer().then(function (buff) {
                //upload the image to s3
                var s3 = new _aws2.default.S3();
                var params = {
                    ACL: 'public-read',
                    Bucket: process.env.BUCKET_NAME,
                    Body: buff,
                    Key: 'designImage/' + environment + '/' + design._id,
                    ContentType: 'image/jpeg'
                };
                s3.upload(params, function (err, data) {
                    if (err) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                        return res.status(500).send('Error uploading file'); //status: internal server error
                    }
                    if (data) {
                        _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                        //save the design to the db
                        design.image = data.Location;
                        _designModel2.default.findOneAndUpdate({ _id: design._id }, { $set: design }, function (error) {
                            if (error) {
                                return res.status(500).send('Error updating design'); //status: internal server error
                            }
                            return res.status(200).json({ id: design._id }); //status: success
                        });
                    }
                });
            }).catch(function () {
                //if sharp fails
                if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                return res.status(500).send('Error updating design'); //status: internal server error
            });
        }
        //update the design without uploading a new image
        else {
                _designModel2.default.findOneAndUpdate({ _id: design._id }, { $set: design }, function (error) {
                    if (error) {
                        return res.status(500).send('Error updating design'); //status: internal server error
                    }
                    return res.status(200).json({ id: design._id }); //status: success
                });
            }
    }).catch(function () {
        //if unable to get users id
        if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
        return res.status(500).send('Error updating design'); //status: internal server error
    });
}

function createDesign(req, res) {
    auth.getUserId(req).then(function (userId) {
        //get the users id
        //check for empty required values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags || !req.file) {
            if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            return res.status(400).send('Include all required fields'); //status: bad request
        }
        //only allow image file types
        if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
            _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            return res.status(422).send('File must be of type .jpeg or .png'); //status: Unprocessable Entity
        }
        //create the design and get its id
        var design = new _designModel2.default({
            user: userId,
            designCode: req.body.designCode,
            image: '',
            imageVersion: 1,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            tags: JSON.parse(req.body.tags),
            likes: []
        });
        var designId = design._id;

        //set the environment type
        var environment = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';

        //resize the image
        (0, _sharp2.default)(req.file.path).resize(500, 281).jpeg({ quality: 90 }).toBuffer().then(function (buff) {
            //upload the image to s3
            var s3 = new _aws2.default.S3();
            var params = {
                ACL: 'public-read',
                Bucket: process.env.BUCKET_NAME,
                Body: buff,
                Key: 'designImage/' + environment + '/' + designId,
                ContentType: 'image/jpeg'
            };
            s3.upload(params, function (err, data) {
                if (err) {
                    _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                    return res.status(500).send('Error uploading file'); //status: internal server error
                }
                if (data) {
                    _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                    //save the design to the db
                    design.image = data.Location;
                    design.save(function (error) {
                        if (error) {
                            return res.status(500).send('Error creating design'); //status: internal server error
                        }
                        return res.status(201).json({ id: designId }); //status: success, created
                    });
                }
            });
        }).catch(function () {
            //if sharp fails
            if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            return res.status(500).send('Error creating design'); //status: internal server error
        });
    }).catch(function () {
        //if unable to get users id
        if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
        return res.status(500).send('Error creating design'); //status: internal server error
    });
}

function deleteDesign(req, res) {
    _designModel2.default.deleteOne({ _id: req.params.id }, function (error) {
        if (error) {
            return res.status(500).send('Error deleting design'); //status: internal server error
        }
        //delete the image
        var s3 = new _aws2.default.S3();
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: [{
                    Key: 'designImage/' + req.params.id
                }]
            }
        };
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                return res.status(500).send('Error deleting design image'); //status: internal server error
            }
            if (data) {
                return res.status(200).send();
            }
        });
    });
}