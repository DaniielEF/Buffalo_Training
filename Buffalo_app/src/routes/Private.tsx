import React from 'react';
import { Navigate } from 'react-router-dom'

interface PrivateProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
  }

const Private: React.FC<PrivateProps> = ({ isAuthenticated, children }) => {
    
  return isAuthenticated ? children : <Navigate to='/login' />
}

export default Private
