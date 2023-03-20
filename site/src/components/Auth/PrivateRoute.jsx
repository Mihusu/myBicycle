import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import jwt_decode from "jwt-decode";

const isValidToken = (token) => {
  if (!token) {
    return false
  }

  const decoded = jwt_decode(token)

  const isExpired = decoded.exp > Date.now()
  if (isExpired) {
    return false
  }

  return true
}

export const PrivateRoutes = () => {

  const token = secureLocalStorage.getItem('accesstoken')
  const isAuthenticated = isValidToken(token)

  return (
    isAuthenticated ?
      <Outlet />
      :
      <Navigate to='/login' />
  )
}
