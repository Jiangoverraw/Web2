import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Post = () => {
    const { token, userData } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", content: "", tags: "", image: "", category: "" });
    const [activeMenu, setActiveMenu] = useState(null); 
    const [isEditFormOpen, setIsEditFormOpen] = useState(false); 
    const [editPost, setEditPost] = useState({ title: "", content: "", tags: "", image: "", category: "" }); 
    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/user/all-posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [token]);

    // Handle form submission (Create Post)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/api/user/create-post",
                {
                    ...newPost,
                    tags: newPost.tags.split(",").map((tag) => tag.trim()),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const createdPost = {
                ...response.data.post,
                user: userData,
            };
            setPosts([createdPost, ...posts]);
            setIsFormOpen(false);
            setNewPost({ title: "", content: "", tags: "", image: "", category: "" });
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };

    // Handle updating a post
    const handleUpdatePost = async (postId, updatedData) => {
        try {
            const response = await axios.put(
                "/api/user/update-post",
                { postId, ...updatedData },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, ...response.data.post } : post
                )
            );
            setIsEditFormOpen(false); // Đóng form chỉnh sửa
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Failed to update post:", error);
            alert("Failed to update post.");
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete("/api/user/delete-post", {
                headers: { Authorization: `Bearer ${token}` },
                data: { postId }, 
            });

            if (response.data.success) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                alert("Post deleted successfully!");
            } else {
                alert(response.data.error || "Failed to delete post.");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white py-20 px-4 md:px-12">
            <h1 className="text-3xl font-bold mb-6">Posts</h1>

            {/* Post Input Bar */}
            <div
                className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700"
                onClick={() => setIsFormOpen(true)} // Mở form khi nhấp vào thanh
            >
                <img
                    src={userData?.avatar || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    placeholder={`${userData?.name || "User"}`}
                    className="flex-1 bg-gray-700 text-gray-300 p-2 rounded-lg cursor-pointer"
                    readOnly // Chỉ để hiển thị, không cho phép nhập
                />
            </div>

            <div className="space-y-6 mt-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-gray-800 p-4 rounded-lg relative">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p className="text-gray-300 mt-2">{post.content}</p>
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-lg mt-4"
                            />
                        )}
                        <p className="text-gray-500 text-sm mt-4">Posted by: {post.user?.name || "Unknown"}</p>
                        <p className="text-gray-500 text-sm mt-2">Category: {post.category || "Uncategorized"}</p>

                        {post.user?._id === userData?._id && (
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setActiveMenu(activeMenu === post._id ? null : post._id)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    &#x22EE; {/* Dấu 3 chấm dọc */}
                                </button>
                                {activeMenu === post._id && (
                                    <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg">
                                        <button
                                            onClick={() => {
                                                setEditPost(post); 
                                                setIsEditFormOpen(true);
                                                setActiveMenu(null);
                                            }}
                                            className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post._id)}
                                            className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}       
                        </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Content</label>
                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={newPost.tags}
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={newPost.image}
                                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Category</label>
                                <select
                                    value={newPost.category}
                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Car">Car</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Truck">Truck</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Van">Van</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdatePost(editPost._id, editPost);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Content</label>
                                <textarea
                                    value={editPost.content}
                                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={editPost.tags}
                                    onChange={(e) =>
                                        setEditPost({ ...editPost, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={editPost.image}
                                    onChange={(e) => setEditPost({ ...editPost, image: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Category</label>
                                <select
                                    value={editPost.category}
                                    onChange={(e) => setEditPost({ ...editPost, category: e.target.value })}
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Car">Car</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Truck">Truck</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Van">Van</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditFormOpen(false)}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
