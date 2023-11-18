import React from 'react'
import Cookies from 'universal-cookie'
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {

    const cookie = new Cookies();
    const token = cookie.get('auth-token')

    return token ? <Navigate to="/dashboard" /> : <Outlet />  
}

export default PublicRoute