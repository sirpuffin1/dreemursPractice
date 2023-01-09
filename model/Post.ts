import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    transcription: {
        type: String
    },
    likes: {
        type: Number, default: 0
    }
})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post