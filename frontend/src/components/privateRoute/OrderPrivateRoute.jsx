import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {

    const { orderList } = useSelector(state => state.FoodOrderReducer)

    const orderItem = sessionStorage.getItem("orderItem") ? JSON.parse(sessionStorage.getItem("orderItem")) : []

    return orderList.length !== 0 || orderItem.length !== 0 ? children : <Navigate to='/' replace />


}

export default PrivateRoute
