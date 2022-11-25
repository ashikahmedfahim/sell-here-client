import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return;
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;