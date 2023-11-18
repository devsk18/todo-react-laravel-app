import React from 'react'
import Cookies from 'universal-cookie'

const cookie = new Cookies();
const AuthCookie = cookie.get('auth-token')

export default AuthCookie