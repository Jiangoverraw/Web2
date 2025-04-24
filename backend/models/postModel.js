import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [String],
    category: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("post", postSchema);

export default PostModel;