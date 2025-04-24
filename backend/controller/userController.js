import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import PostModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const registerUser = async (req, res) => {
    try {
        const { name, email, password_1, password_2, phone } = req.body;

        if (!name || !email || !password_1 || !password_2 || !phone) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Please enter a valid email" });
        }

        if (password_1.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        if (password_1 !== password_2) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        if (phone.length < 10) {
            return res.status(400).json({ error: "Phone number must be at least 10 digits long" });
        }

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_1, salt);

        const userdata = {
            name,
            email,
            password: hashedPassword,
            phone,
        };

        const newUser = new userModel(userdata);
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const accesstoken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accesstoken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: "Google token is required" });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({
                name,
                email,
                image: picture,
                googleId: payload.sub,
                password: '123123123',
                phone: 'unknown',
            });
            await user.save();
        }

        const accesstoken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            accesstoken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({ error: "Google login failed" });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, error: "Failed to fetch user" });
    }
};

export const allUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Something went wrong" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const userId = req.body.userId;

        if (!name || !phone) {
            return res.status(400).json({ error: "Please fill all the required fields" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.phone = phone;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "user_avatars",
                    public_id: `avatar_${userId}`,
                    overwrite: true,
                });
                user.avatar = result.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
            }
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};


export const createPost = async (req, res) => {
    try {
        const { title, content, image, tags,category } = req.body;
        const userId = req.body.userId;


        if (!title || !content || !category) {
            return res.status(400).json({ success: false, error: "Title and content are required" });
        }

        const newPost = new PostModel({
            user: userId, 
            title,
            content,
            image,
            category,
            tags: typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : [],
        });

        const savedPost = await newPost.save();
        res.status(201).json({ success: true, post: savedPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ success: false, error: "Failed to create post" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate("user", "name avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, error: "Failed to fetch posts" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id).populate("user", "name email avatar");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error("Get Post By ID Error:", error);
        return res.status(500).json({ error: "Failed to fetch post details" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { postId, title, content, image, tags, category } = req.body;
        const userId = req.body.userId;

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }

        if (post.user.toString() !== userId) {
            return res.status(403).json({ success: false, error: "You are not authorized to update this post" });
        }

        if (category) post.category = category;
        if (title) post.title = title;
        if (content) post.content = content;
        if (image) post.image = image;
        if (tags && typeof tags === "string") {
            post.tags = tags.split(",").map((tag) => tag.trim());
        } else if (Array.isArray(tags)) {
            post.tags = tags;
        }

        const updatedPost = await post.save();

        // Populate user information before sending the response
        const populatedPost = await PostModel.findById(updatedPost._id).populate("user", "name avatar");

        res.status(200).json({ success: true, message: "Post updated successfully", post: populatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ success: false, error: "Failed to update post" });
    }
};
 
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.body.userId;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }

        if (post.user.toString() !== userId) {
            return res.status(403).json({ success: false, error: "You are not authorized to delete this post" });
        }

        await PostModel.findByIdAndDelete(postId);

        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ success: false, error: "Failed to delete post" });
    }
};

