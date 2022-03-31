import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPrivateRoute = ({ children }) => {

    const { admin } = useSelector(state => state.AdminReducer)


    return Object.keys(admin).length !== 0 ? children : <Navigate to='/admin/login' replace />


}

export default AdminPrivateRoute
