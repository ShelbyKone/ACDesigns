import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    user: { type: String, ref: 'User' },
    designCode: String,
    image: String,
    title: String,
    description: String,
    type: String,
    tags: [String],
    likes: Number,
})

export default mongoose.model('Design', designSchema)