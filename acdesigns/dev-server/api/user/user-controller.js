import User from '../../models/user-model'
import aws from '../../config/aws'
import fs from 'fs'

//create the user in the database 
export function createUser(req, res) {
    //check for empty values
    if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
        res.statusMessage = 'Include all required fields.'
        return res.status(400).end() //status: bad request
    }

    //create the user
    const user = new User({
        _id: req.body._id,
        islandRep: req.body.islandRep,
        islandName: req.body.islandName,
        creatorCode: '',
        about: '',
        image: '',
        favorites: []
    })

    //save the user to the db
    user.save(error => {
        if (error) {
            if (error.code === 11000) {
                res.statusMessage = 'A user with this ID already exists.'
                return res.status(403).end() //status: forbidden
            }
            res.statusMessage = "Registration failed."
            return res.status(500).end() //status: internal server error
        }
        return res.status(201).json() //status: success, created
    })
}

//get a user by their id
export function getUser(req, res) {
    User.findOne({ _id: req.params.id }, (error, user) => {
        if (error) {
            res.statusMessage = "Error retrieving user from database."
            return res.status(500).json() //status: internal server error
        }
        if (!user) {
            res.statusMessage = `No user with id ${req.params.id} found.`
            return res.status(404).json() //status: not found
        }
        return res.status(200).json({ user: user }) //status: success
    })
}

//update a users profile
export function updateUser(req, res) {
    const s3 = new aws.S3();

    var params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `profileImage/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
        if (err) {
            res.statusMessage = "Error uploading file to S3 bucket."
            return res.status(500).json() //status: internal server error
        }
        if (data) {
            console.log('File uploaded')
            return res.status(200).json() //status: success
        }
    })
}