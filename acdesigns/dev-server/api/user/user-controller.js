import User from '../../models/user-model'

export function createUser(req, res) {
    // check for empty values
    if (!req.body._id || !req.body.islandRep || !req.body.islandName) {
        return res.status(400).json({ message: 'User ID, resident name, and island name are required.' }) //status: bad request
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
                return res.status(403).json({ message: 'A user with this ID already exists.' }) //status: forbidden
            }
            return res.status(500).json() //status: internal server error
        }
        return res.status(201).json() //status: success, created
    })
}