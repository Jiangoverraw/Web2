import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-8.jpg',
        required: true
    }
})

const userModel = mongoose.model('user', userSchema)

export default userModel
