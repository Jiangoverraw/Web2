import express from "express";
import {
    registerUser,
    loginUser,
    googleLogin,
    getUser,
    allUser,
    deleteUser,
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    updateProfile,
    getPostById,
} from "../controller/userController.js";
import authUser from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/get-user", authUser, getUser); 
userRouter.get("/all-users", authUser, allUser);
userRouter.delete("/delete-user", authUser, deleteUser);
userRouter.post("/create-post", authUser, createPost);
userRouter.get("/all-posts", getAllPosts); 
userRouter.put("/update-post", authUser, updatePost); 
userRouter.delete("/delete-post", authUser, deletePost); 
userRouter.get("/post/:id", getPostById); 
userRouter.put("/update-profile", authUser, upload.single("image"), updateProfile);


export default userRouter; 