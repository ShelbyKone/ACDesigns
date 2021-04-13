import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    user: { type: String, ref: 'User' },
    designCode: String,
    image: String,
    imageVersion: Number,
    title: String,
    description: String,
    type: String,
    tags: [String],
    likes: [String],
})

export default mongoose.model('Design', designSchema)