import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { GoogleLogin } from '@react-oauth/google';  

const Login = () => {
  const navigate = useNavigate();
  const { setUserData: setUser, setToken } = useContext(AppContext);

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('/api/user/google-login', { token: credential });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      setToken(res.data.accesstoken);
      setUser(res.data.user);
      localStorage.setItem('access_token', res.data.accesstoken);

      navigate('/');
    } catch (error) {
      console.error('Google Login failed:', error);
      alert('Google Login failed!');
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error('Google Login Failed:', error);
    alert('Google Login Failed!'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('/api/user/login', { email, password });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      setToken(response.data.accesstoken);
      localStorage.setItem('access_token', response.data.accesstoken);
      setUser(response.data.user);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.wallpaperscraft.com/image/single/bmw_i8_concept_98354_1920x1080.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <form
          className="md:w-96 w-80 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-black font-medium text-center">Sign in</h2>
          <p className="text-sm text-black mt-3 text-center">
            Welcome back! Please sign in to continue
          </p>

          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} useOneTap />

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-500/90"></div>
            <p className=" text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-500/90"></div>
          </div>

          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 bg-white">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 bg-white">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent outline-none text-sm w-full h-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-gray bg-indigo-200 hover:bg-indigo-300 transition"
          >
            Login
          </button>

          <p className="text-black text-sm mt-4 text-center">
            Don’t have an account?{' '}
            <Link className="text-indigo-200 hover:underline" to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
