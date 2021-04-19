import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    _id: String,
    islandRep: String,
    islandName: String,
    creatorCode: String,
    about: String,
    image: String,
    imageVersion: Number,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }]
})

export default mongoose.model('User', userSchema)