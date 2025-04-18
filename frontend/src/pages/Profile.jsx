import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Profile = () => {
    const { userData, setUserData } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        phone: userData?.phone || '',
        password: '',
        image: null,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('userId', userData._id);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            if (formData.password) {
                formDataToSend.append('password', formData.password);
            }

            const response = await axios.put('/api/user/update-profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (response.data.success) {
                setSuccessMessage('Profile updated successfully!');
                setUserData({ ...userData, ...formData });
                setIsEditing(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setErrorMessage(response.data.message || 'Something went wrong!');
                setTimeout(() => setErrorMessage(''), 3000);
            }
        } catch (error) {
            setErrorMessage('An error occurred while updating the profile.');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                        {userData && userData.image ? (
                            <img src={userData.image} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                                No Image
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-gray-600"
                        />
                    )}

                    <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>

                    {successMessage && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded w-full text-center">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded w-full text-center">
                            {errorMessage}
                        </div>
                    )}

                    <div className="w-full space-y-4 text-gray-700">
                        <div className="flex items-center space-x-3">
                            <span><strong>Name:</strong></span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <span>{userData?.name}</span>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            <span><strong>Phone:</strong></span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <span>{userData && userData.phone}</span>
                            )}
                        </div>

                        {isEditing && (
                            <div className="flex items-center space-x-3">
                                <label><strong>New Password:</strong></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4 mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;