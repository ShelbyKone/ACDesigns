import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creatorCode: String,
    designCode: String,
    image: String,
    title: String,
    description: String,
    tags: [String],
    likes: Number,
})

export default mongoose.model('Design', designSchema)