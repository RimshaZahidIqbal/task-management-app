// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while auth state is being checked
    }

    if (!user) {
        return <Navigate to="/auth" />; // Redirect to login page if the user is not authenticated
    }

    return children;
};

export default ProtectedRoute;
