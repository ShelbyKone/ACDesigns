'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDesign = getDesign;
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function getDesigns(req, res) {
    _designModel2.default.find({}, function (error, designs) {
        if (error) {
            return res.status(500).send('Error retrieving designs from database.'); //status: internal server error
        }
        return res.status(200).json({ designs: designs });
    }).populate('user');
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

        //create the design
        var design = new _designModel2.default(req.body);
        design.tags = JSON.parse(design.tags);

        //if theres an image, upload it to s3 then update the design
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png'); //status: Unprocessable Entity
            }

            //upload the image to s3
            var s3 = new _aws2.default.S3();
            var params = {
                ACL: 'public-read',
                Bucket: process.env.BUCKET_NAME,
                Body: _fs2.default.createReadStream(req.file.path),
                Key: 'designImage/' + design._id,
                ContentType: req.file.mimetype
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
                    _designModel2.default.findOneAndUpdate({ _id: design._id }, design, function (error) {
                        if (error) {
                            return res.status(500).send('Error creating design'); //status: internal server error
                        }
                        return res.status(204).send(); //status: success, no content
                    });
                }
            });
        }
        //update the design without uploading a new image
        else {
                _designModel2.default.findOneAndUpdate({ _id: design._id }, design, function (error) {
                    if (error) {
                        return res.status(500).send('Error creating design'); //status: internal server error
                    }
                    return res.status(204).send(); //status: success, no content
                });
            }
    }).catch(function () {
        //if unable to get users id
        if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
        return res.status(500).send('Error creating design'); //status: internal server error
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
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            tags: JSON.parse(req.body.tags),
            likes: []
        });
        var designId = design._id;

        //upload the image to s3
        var s3 = new _aws2.default.S3();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Body: _fs2.default.createReadStream(req.file.path),
            Key: 'designImage/' + designId,
            ContentType: req.file.mimetype
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