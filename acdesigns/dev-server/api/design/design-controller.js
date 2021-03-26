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

}

export function createDesign(req, res) {
    auth.getUserId(req).then((userId) => { //get the users id
        //check for empty values
        if (!req.body.designCode || !req.body.title || !req.body.description || !req.body.type || !req.body.tags || !req.file) {
            if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
            res.statusMessage = 'Include all required fields.'
            return res.status(400).end() //status: bad request
        }
        if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') { //if the file is not an image
            fs.unlinkSync(req.file.path) //empty uploads folder
            res.statusMessage = 'File must be of type .jpeg or .png'
            return res.status(422).end() //status: Unprocessable Entity
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
                res.statusMessage = 'Error uploading file.'
                return res.status(500).end() //status: internal server error
            }
            if (data) {
                fs.unlinkSync(req.file.path) //empty uploads folder
                //save the design to the db
                design.image = data.Location
                design.save(error => {
                    if (error) {
                        console.log(error)
                        res.statusMessage = "Error creating design."
                        return res.status(500).end() //status: internal server error
                    }
                    return res.status(201).json() //status: success, created
                })
            }
        })
    })
        .catch(() => { //if unable to get users id
            fs.unlinkSync(req.file.path) //empty uploads folder
            res.statusMessage = 'Unable to get user id.'
            return res.status(500).end() //status: internal server error
        })
}

export function deleteDesign(req, res) {

}