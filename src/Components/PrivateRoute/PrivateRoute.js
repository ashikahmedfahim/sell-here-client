import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';

const PrivateRoute = ({ children }) => {
    const { user, isLoading, accountType } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    if (isLoading) {
        return;
    }

    if (location.pathname === '/dashboard' && accountType !== 'admin') {
        navigate('/404');
        return;
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;