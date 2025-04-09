// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // parse to access name/id
  const role = localStorage.getItem('role');
  console.log("ProtectedRoute: token", token);
  console.log("ProtectedRoute: user", user);
  console.log("ProtectedRoute: role", role);
  
  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/loginForm" />;
  }

  // If a specific role is required but doesn't match
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/loginForm" />;
  }

  return children;
};

export default ProtectedRoute;
