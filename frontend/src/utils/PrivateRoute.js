import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    let token = {'auth': false}
  return (
    token.auth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    )
  )
}

export default PrivateRoute