import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {

    const { user } = useSelector(state => state.UserReducer)


    return Object.keys(user).length !== 0 ? children : <Navigate to='/user/login' replace />
    // return !user || Object.keys(user).length !== 0 ? children : <Navigate to='/user/login' replace />

}

export default PrivateRoute
