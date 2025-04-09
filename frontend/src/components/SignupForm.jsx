import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/sign-login/signin", formData);
      alert(res.data.message);
      navigate('/loginForm');
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  function handleBack(){
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCC6AE]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full mb-3 p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full mb-3 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full mb-3 p-2 border rounded" />
        <div className='flex justify-between'>
        <button type='submit' onClick={handleBack}  className="bg-[#6D4C41] text-white hover:bg-[#DCC6AE] hover:text-amber-950 p-2 rounded w-30">Back</button>
        <button type="submit" className="bg-[#6D4C41] text-white p-2 rounded           hover:bg-[#DCC6AE] hover:text-amber-950  w-30">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
