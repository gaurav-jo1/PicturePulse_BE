import React,{useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const {user} = useContext(AuthContext)
  let auth = user;
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default RequireAuth;
