import Design from '../../models/design-model'
import aws from '../../config/aws'
import * as auth from '../../services/auth-service'
import fs from 'fs'
import sharp from 'sharp'
sharp.cache({ files : 0 });

export function getDesign(req, res) {
    Design.findOne({ _id: req.params.id }, (error, design) => {
        if (error) {
            return res.status(500).send('Error retrieving design from database.') //status: internal server error
        }
        if (!design) {
            res.statusMessage = `No design with id ${req.params.id} found.`
            return res.status(404).send(`No design with id ${req.params.id} found`) //status: not found
        }
        return res.status(200).json({ design: design }) //status: success
    }).populate('user')
}

export function getUserDesigns(req, res) {
    Design.find({ user: req.params.id }, (error, designs) => {
        if (error) {
            return res.status(500).send('Error retrieving users designs from database.') //status: internal server error
        }
        return res.status(200).json({ designs: designs }) //status: success
    })
}

export function getDesigns(req, res) {
    //get the query parameters
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 12
    const filter = req.query.filter

    Design.find({}, (error, designs) => {
        if (error) {
            return res.status(500).send('Error retrieving designs from database.') //status: internal server error
        }
        return res.status(200).json({ designs: designs })
    })
}

export function updateDesign(req, res) {
    auth.getUserId(req).then((userId) => { //get the users id
        //only allow the user who made the request to update their own designs
        if (userId != req.body.user) {
            return res.status(401).send('You are not authorized to make this request') //status: unauthorized
        }
        //check for empty required values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags) {
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(400).send('Include all required fields') //status: bad request
        }

        //create the design
        const design = req.body
        design.tags = JSON.parse(design.tags)

        //if theres an image, upload it to s3 then update the design
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                fs.unlinkSync(req.file.path) //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png') //status: Unprocessable Entity
            }
            //update the image version (to refresh the cache)
            design.imageVersion++

            //resize the image
            sharp(req.file.path).resize(500, 281).jpeg({quality: 90}).toBuffer()
                .then(buff => {
                    //upload the image to s3
                    const s3 = new aws.S3();
                    var params = {
                        ACL: 'public-read',
                        Bucket: process.env.BUCKET_NAME,
                        Body: buff,
                        Key: `designImage/${design._id}`,
                        ContentType: 'image/jpeg'
                    };
                    s3.upload(params, (err, data) => {
                        if (err) {
                            fs.unlinkSync(req.file.path) //empty uploads folder
                            return res.status(500).send('Error uploading file') //status: internal server error
                        }
                        if (data) {
                            fs.unlinkSync(req.file.path) //empty uploads folder
                            //save the design to the db
                            design.image = data.Location
                            Design.findOneAndUpdate({ _id: design._id }, { $set: design }, (error) => {
                                if (error) {
                                    return res.status(500).send('Error updating design') //status: internal server error
                                }
                                return res.status(200).json({ id: design._id }) //status: success
                            })
                        }
                    })
                })
                .catch(() => { //if sharp fails
                    if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
                    return res.status(500).send('Error updating design') //status: internal server error
                })
        }
        //update the design without uploading a new image
        else {
            Design.findOneAndUpdate({ _id: design._id }, { $set: design }, (error) => {
                if (error) {
                    return res.status(500).send('Error updating design') //status: internal server error
                }
                return res.status(200).json({ id: design._id }) //status: success
            })
        }
    })
        .catch(() => { //if unable to get users id
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(500).send('Error updating design') //status: internal server error
        })
}

export function createDesign(req, res) {
    auth.getUserId(req).then((userId) => { //get the users id
        //check for empty required values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags || !req.file) {
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(400).send('Include all required fields') //status: bad request
        }
        //only allow image file types
        if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
            fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(422).send('File must be of type .jpeg or .png') //status: Unprocessable Entity
        }
        //create the design and get its id
        const design = new Design({
            user: userId,
            designCode: req.body.designCode,
            image: '',
            imageVersion: 1,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            tags: JSON.parse(req.body.tags),
            likes: [],
        })
        const designId = design._id

        //resize the image
        sharp(req.file.path).resize(500, 281).jpeg({quality: 90}).toBuffer()
            .then(buff => {
                //upload the image to s3
                const s3 = new aws.S3();
                var params = {
                    ACL: 'public-read',
                    Bucket: process.env.BUCKET_NAME,
                    Body: buff,
                    Key: `designImage/${designId}`,
                    ContentType: 'image/jpeg'
                };
                s3.upload(params, (err, data) => {
                    if (err) {
                        fs.unlinkSync(req.file.path) //empty uploads folder
                        return res.status(500).send('Error uploading file') //status: internal server error
                    }
                    if (data) {
                        fs.unlinkSync(req.file.path) //empty uploads folder
                        //save the design to the db
                        design.image = data.Location
                        design.save(error => {
                            if (error) {
                                return res.status(500).send('Error creating design') //status: internal server error
                            }
                            return res.status(201).json({ id: designId }) //status: success, created
                        })
                    }
                })
            })
            .catch(() => { //if sharp fails
                if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
                return res.status(500).send('Error creating design') //status: internal server error
            })
    })
        .catch(() => { //if unable to get users id
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(500).send('Error creating design') //status: internal server error
        })
}

export function deleteDesign(req, res) {
    Design.deleteOne({ _id: req.params.id }, error => {
        if (error) {
            return res.status(500).send('Error deleting design') //status: internal server error
        }
        //delete the image
        const s3 = new aws.S3();
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: [
                    {
                        Key: `designImage/${req.params.id}`,
                    }
                ]
            }
        };
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                return res.status(500).send('Error deleting design image') //status: internal server error
            }
            if (data) {
                return res.status(200).send()
            }
        });
    })
}