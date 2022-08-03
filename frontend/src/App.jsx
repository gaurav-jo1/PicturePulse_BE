import React from "react";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import PrivateRoute from './utils/UserValid'
import { AuthProvider } from "./context/AuthContext";

import './App.scss';


const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;