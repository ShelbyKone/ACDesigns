import User from '../../models/user-model'
import aws from '../../config/aws'
import * as auth from '../../services/auth-service'
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
    const user = new User(req.body)

    auth.getUserId(req).then((id) => { //get the users id
        if (id == user._id) { //only allow the user who made the request to update their own profile
            if (req.file) { //if theres an image, upload it to s3 then update the user
                const s3 = new aws.S3();

                var params = {
                    ACL: 'public-read',
                    Bucket: process.env.BUCKET_NAME,
                    Body: fs.createReadStream(req.file.path),
                    Key: `profileImage/${user._id}`
                };

                s3.upload(params, (err, data) => {
                    if (err) {
                        res.statusMessage = "Error uploading file to S3 bucket."
                        return res.status(500).json() //status: internal server error
                    }
                    if (data) {
                        fs.unlinkSync(req.file.path) //empty uploads folder

                        user.image = data.Location
                        User.findOneAndUpdate({ _id: user._id }, user, (error) => {
                            if (error) {
                                return res.status(500).json() //status: internal server error
                            }
                            return res.status(204).json() //status: success, no content
                        })
                    }
                })
            }
            else { //update the user without uploading an image
                User.findOneAndUpdate({ _id: user._id }, user, (error) => {
                    if (error) {
                        return res.status(500).json() //status: internal server error
                    }
                    return res.status(204).json() //status: success, no content
                })
            }
        }
        else { //if the token user id doesn't match the request user id
            return res.status(401).json({ message: 'You are not authorized to make this request.' })
        }
    })
        .catch((error) => { //if unable to get users id
            return res.status(500).json() //status: internal server error
        })
}