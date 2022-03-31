import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {

    // use redux here or custom context
    const { user } = useSelector(state => state.UserReducer)

    return Object.keys(user).length === 0 ? children : <Navigate to='/' replace />

}

export default PublicRoute
