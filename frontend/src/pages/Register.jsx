import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password_1 = e.target.password.value;
        const password_2 = e.target.confirmPassword.value;
        const phone = e.target.phone.value;
    
        if (password_1 !== password_2) {
            alert("Passwords do not match");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4311/api/user/register', {
                name,
                email,
                password_1,
                password_2,
                phone
            });
    
            const data = response.data;
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                alert("Registration successful! Please log in.");
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert("Something went wrong during signup");
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.wallpaperscraft.com/image/single/bmw_i8_concept_98354_1920x1080.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10">
                <form
                    className="md:w-96 w-80 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-medium text-center">Sign up</h2>
                    <p className="text-sm text-black mt-3 text-center">
                        Create your account
                    </p>

                    <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 bg-white">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-4 w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 bg-white">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone" // Add a placeholder for the phone field
                            className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-4 w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 bg-white">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
                            required
                        />
                    </div>


                    <div className="flex items-center mt-4 w-full border border-gray-300 h-12 rounded-full pl-6 pr-4 bg-white">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="flex items-center mt-4 w-full border border-gray-300 h-12 rounded-full pl-6 pr-4 bg-white">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full h-11 rounded-full text-gray bg-indigo-200 hover:bg-indigo-300 transition"
                    >
                        Sign up
                    </button>

                    <p className="text-black text-sm mt-4 text-center">
                        Already have an account?{' '}
                        <Link className="text-indigo-200 hover:underline" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
