import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthCheck = ({ children }) => {
  const authToken = localStorage.getItem('token'); 

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthCheck;
