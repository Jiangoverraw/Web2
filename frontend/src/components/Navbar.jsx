import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User } from 'react-feather'; // 
import axios from 'axios';

const Navbar = () => {
    const { token, userData, setToken, setUserData } = useContext(AppContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 

    useEffect(() => {
        if (!userData && token) {
            const fetchUserData = async () => {
                try {
                    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-user`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (data.success) {
                        setUserData(data.user);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setToken(null);
                    localStorage.removeItem("access_token");
                }
            };
            fetchUserData();
        }
    }, [token, userData, setToken, setUserData]);

    const handleLogout = () => {
        setToken(null);
        setUserData(null);
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    console.log("User Data:", userData); 

    return (
        <header className="bg-gray-500/20 backdrop-blur-md text-gray-100 py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
            <h1 className="text-xl font-bold">
                <Link to="/">Jezcar</Link>
            </h1>
            <nav className="flex items-center gap-6">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/post" className="hover:underline">Post</Link>
            </nav>
            <div className="flex items-center gap-4 relative">
                {token && userData ? (
                    <>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        >
                            <img
                                src={userData?.image || "https://via.placeholder.com/40"} 
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <span>{userData?.name}</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg w-48">
                                <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 shadow-md z-0"></div>
                                <div className="p-4 relative z-10">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 text-black hover:text-gray-700 mb-2 font-medium"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Edit Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium w-full"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;