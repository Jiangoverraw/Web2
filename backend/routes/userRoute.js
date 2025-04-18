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
    addComment,
    updateProfile,
    getPostById,
} from "../controller/userController.js";
import authUser from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/get-user", authUser, getUser); // Lấy thông tin người dùng
userRouter.get("/all-users", authUser, allUser);
userRouter.delete("/delete-user", authUser, deleteUser);

// Routes liên quan đến bài viết
userRouter.post("/create-post", authUser, createPost); // Tạo bài viết
userRouter.get("/all-posts", getAllPosts); // Lấy danh sách bài viết
userRouter.put("/update-post", authUser, updatePost); // Cập nhật bài viết
userRouter.delete("/delete-post", authUser, deletePost); // Xóa bài viết
userRouter.post("/add-comment", authUser, addComment); // Thêm bình luận

userRouter.get("/post/:id", getPostById); // Route để lấy chi tiết bài viết
userRouter.put("/update-profile", authUser, upload.single("image"), updateProfile);

export default userRouter;