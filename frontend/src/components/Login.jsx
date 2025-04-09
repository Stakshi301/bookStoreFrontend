import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      alert('All fields are required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/sign-login/login', {
        email,
        password,
      });
  
      console.log("Login Response:", response.data); // 🔍 Debug log
  
      if (response.data?.token) {
        const { token, user, role } = response.data;
  
        // Fallback if `role` is undefined
        const userRole = role || user?.role;
  
        console.log("User Role to Store:", userRole); // ✅ Confirm role value
  
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('role', userRole);  // ✅ Always store defined role
        localStorage.setItem('user', JSON.stringify(user));
  
        if (userRole === 'admin') {
          navigate('/createBook');
        } else {
          navigate('/books');
        }
      }
    } catch (error) {
      if (error.response?.data?.message === 'User not exist please Signup first') {
        alert('User not found. Redirecting to Signup...');
        navigate('/signup');
      } else {
        alert(error.response?.data?.message || 'Login failed');
      }
    }
  };
  
  

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4E342E] to-[#3E2723]">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              className="w-full mb-4 p-3 rounded bg-white/30 text-white placeholder-white border border-amber50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className="w-full mb-4 p-3 rounded bg-white/30 text-white placeholder-white border border-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 hover:bg-[#6D4C41] hover:text-white bg-[#DCC6AE] text-black rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 hover:bg-[#6D4C41] hover:text-white bg-[#DCC6AE] rounded text-black" 
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
