import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6D4C41] to-[#A1887F] flex flex-col justify-center items-center text-white">
        <div className='bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full'>

      <h1 className="text-5xl font-bold mb-6">📚 Welcome to BookVerse</h1>
      <p className="mb-10 text-lg">Your personal bookstore where every book finds a reader.</p>

      <div className="space-x-4">
        <button
          onClick={() => navigate('/loginForm')}
          className="bg-white text-[#6D4C41] font-semibold px-6 py-2 rounded-2xl shadow-md hover:bg-[#f5f5f5] transition duration-200"
          >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-[#6D4C41] font-semibold px-6 py-2 rounded-2xl shadow-md hover:bg-[#f5f5f5] transition duration-200"
          >
          Signup
        </button>
      </div>
    </div>
            </div>
  );
};

export default LandingPage;

