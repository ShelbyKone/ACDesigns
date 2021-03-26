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
            res.statusMessage = "Error retrieving design from database.";
            return res.status(500).end(); //status: internal server error
        }
        if (!design) {
            res.statusMessage = 'No design with id ' + req.params.id + ' found.';
            return res.status(404).end(); //status: not found
        }
        return res.status(200).json({ design: design }); //status: success
    }).populate('user');
}

function getDesigns(req, res) {}

function updateDesign(req, res) {}

function createDesign(req, res) {
    auth.getUserId(req).then(function (userId) {
        //get the users id
        //check for empty values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags || !req.file) {
            if (req.file) _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            res.statusMessage = 'Include all required fields.';
            return res.status(400).end(); //status: bad request
        }
        if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
            //if the file is not an image
            _fs2.default.unlinkSync(req.file.path); //empty uploads folder
            res.statusMessage = 'File must be of type .jpeg or .png';
            return res.status(422).end(); //status: Unprocessable Entity
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
            likes: 0
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
                res.statusMessage = 'Error uploading file.';
                return res.status(500).end(); //status: internal server error
            }
            if (data) {
                _fs2.default.unlinkSync(req.file.path); //empty uploads folder
                //save the design to the db
                design.image = data.Location;
                design.save(function (error) {
                    if (error) {
                        console.log(error);
                        res.statusMessage = "Error creating design.";
                        return res.status(500).end(); //status: internal server error
                    }
                    return res.status(201).json(); //status: success, created
                });
            }
        });
    }).catch(function () {
        //if unable to get users id
        res.statusMessage = 'Unable to get user id.';
        return res.status(500).end(); //status: internal server error
    });
}

function deleteDesign(req, res) {}