import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    let location = useLocation();

    if(loading)
    {
        return <Loading/>
    }

    if(!user)
    {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
    
};

export default PrivateRoute;