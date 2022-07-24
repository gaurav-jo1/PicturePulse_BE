import React from "react";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

import './App.scss';


const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;