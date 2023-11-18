import React from 'react'
import Cookies from 'universal-cookie'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {

    const cookie = new Cookies();
    const token = cookie.get('auth-token')

    return token ? <Outlet /> : <Navigate to="/login" />  
}

export default PrivateRoute