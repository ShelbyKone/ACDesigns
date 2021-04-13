import User from '../../models/user-model'
import aws from '../../config/aws'
import * as auth from '../../services/auth-service'
import fs from 'fs'
import sharp from 'sharp'

//create the user in the database 
export function createUser(req, res) {
    //check for empty required values
    if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
        return res.status(400).send('Include all required fields') //status: bad request
    }
    //create the user
    const user = new User({
        _id: req.body._id,
        islandRep: req.body.islandRep,
        islandName: req.body.islandName,
        creatorCode: '',
        about: '',
        image: '',
        imageVersion: 1,
        favorites: []
    })
    //save the user to the db
    user.save(error => {
        if (error) {
            if (error.code === 11000) {
                return res.status(403).send('A user with this ID already exists') //status: forbidden
            }
            console.log(error)
            return res.status(500).send('Server error: registration failed') //status: internal server error
        }
        return res.status(201).json() //status: success, created
    })
}

//get a user by their id
export function getUser(req, res) {
    User.findOne({ _id: req.params.id }, (error, user) => {
        if (error) {
            return res.status(500).send('Error retrieving user from database') //status: internal server error
        }
        if (!user) {
            return res.status(404).send(`No user with id ${req.params.id} found`) //status: not found
        }
        return res.status(200).json({ user: user }) //status: success
    })
}

//update a users profile
export function updateUser(req, res) {
    auth.getUserId(req).then((id) => {
        //create the user
        const user = req.body

        //only allow the user who made the request to update their own profile
        if (id != user._id) {
            return res.status(401).send('You are not authorized to make this request') //status: unauthorized
        }
        //check for empty required values
        if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
            return res.status(400).send('Include all required fields') //status: bad request
        }
        //if theres an image, upload it to s3 then update the user
        if (req.file) {
            //only allow image file types
            if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
                fs.unlinkSync(req.file.path) //empty uploads folder
                return res.status(422).send('File must be of type .jpeg or .png') //status: Unprocessable Entity
            }
            //update the image version (to refresh the cache)
            user.imageVersion++

            //resize the image
            sharp(req.file.path).resize(150, 150).jpeg({quality: 90}).toBuffer()
                .then(buff => {
                    //upload the image to s3
                    const s3 = new aws.S3();
                    var params = {
                        ACL: 'public-read',
                        Bucket: process.env.BUCKET_NAME,
                        Body: buff,
                        Key: `profileImage/${user._id}`,
                        ContentType: 'image/jpeg'
                    };
                    s3.upload(params, (err, data) => {
                        if (err) {
                            fs.unlinkSync(req.file.path) //empty uploads folder
                            return res.status(500).send('Error uploading file') //status: internal server error
                        }
                        if (data) {
                            fs.unlinkSync(req.file.path) //empty uploads folder
                            //update the user in the db
                            user.image = data.Location
                            User.findOneAndUpdate({ _id: user._id }, { $set: user }, (error) => {
                                if (error) {
                                    return res.status(500).send('Server error: unable to update user') //status: internal server error
                                }
                                return res.status(204).json() //status: success, no content
                            })
                        }
                    })
                })
                .catch(() => { //if sharp fails
                    if (req.file) fs.unlinkSync(req.file.path) //empty uploads folder
                    return res.status(500).send('Error updating user') //status: internal server error
                })
        }
        //update the user without uploading an image
        else {
            User.findOneAndUpdate({ _id: user._id }, { $set: user }, (error) => {
                if (error) {
                    return res.status(500).send('Server error: unable to update user') //status: internal server error
                }
                return res.status(204).json() //status: success, no content
            })
        }

    })
        .catch(() => { //if unable to get users id
            return res.status(500).send('Unable to get user id') //status: internal server error
        })
}