import Design from '../../models/design-model'
import aws from '../../config/aws'
import * as auth from '../../services/auth-service'
import fs from 'fs'

export function getDesign(req, res) {
    Design.findOne({ _id: req.params.id }, (error, design) => {
        if (error) {
            res.statusMessage = "Error retrieving design from database."
            return res.status(500).end() //status: internal server error
        }
        if (!design) {
            res.statusMessage = `No design with id ${req.params.id} found.`
            return res.status(404).end() //status: not found
        }
        return res.status(200).json({ design: design }) //status: success
    }).populate('user')
}

export function getDesigns(req, res) {

}

export function updateDesign(req, res) {
    auth.getUserId(req).then((userId) => { //get the users id
        //only allow the user who made the request to update their own designs
        if (userId != req.body.user) {
            console.log(`userID: ${userId}`)
            console.log(`req.body.user: ${req.body.user}`)
            return res.status(401).send('You are not authorized to make this request') //status: unauthorized
        }
        //check for empty required values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags) {
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(400).send('Include all required fields') //status: bad request
        }
        //if theres an image, upload it to s3 then update the design
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                fs.unlinkSync(req.file.path) //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png') //status: Unprocessable Entity
            }
            //create the design
            const design = new Design(req.body)

            //upload the image to s3
            const s3 = new aws.S3();
            var params = {
                ACL: 'public-read',
                Bucket: process.env.BUCKET_NAME,
                Body: fs.createReadStream(req.file.path),
                Key: `designImage/${designId}`,
                ContentType: req.file.mimetype
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
                    Design.findOneAndUpdate({ _id: design._id }, design, (error) => {
                        if (error) {
                            return res.status(500).send('Error creating design') //status: internal server error
                        }
                        return res.status(204).json() //status: success, no content
                    })
                }
            })
        }
        //update the design without uploading a new image
        else {
            Design.findOneAndUpdate({ _id: design._id }, design, (error) => {
                if (error) {
                    return res.status(500).send('Error creating design') //status: internal server error
                }
                return res.status(204).json() //status: success, no content
            })
        }
    })
        .catch(() => { //if unable to get users id
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            return res.status(500).send('Unable to get user id') //status: internal server error
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
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            tags: JSON.parse(req.body.tags),
            likes: 0,
        })
        const designId = design._id

        //upload the image to s3
        const s3 = new aws.S3();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Body: fs.createReadStream(req.file.path),
            Key: `designImage/${designId}`,
            ContentType: req.file.mimetype
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
                    return res.status(201).send() //status: success, created
                })
            }
        })
    })
        .catch((error) => { //if unable to get users id
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            console.log(error)
            return res.status(500).send('Unable to get user id') //status: internal server error
        })
}

export function deleteDesign(req, res) {

}