import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Login from './components/Login';
import Createbook from './components/Createbook';
import UserPage from './components/UserPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import SignUp from './components/SignupForm';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div className='bg-[#6D4C41]'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/books' element={<Books />} />
        <Route path='/loginForm' element={<Login />} />

        {/* ✅ Admin only route */}
        <Route
          path='/createBook'
          element={
            <ProtectedRoute allowedRole="admin">
              <Createbook />
            </ProtectedRoute>
          }
        />

        {/* ✅ User only route */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <UserPage />
            </ProtectedRoute>
          }

        />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </div>
  );
};

export default App;
