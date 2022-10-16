import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./utils/RequireAuth";
import ThemeContextProvider from "./context/ThemeContextProvider";

const App = () => {
  return (
    <div className="app">
      <ThemeContextProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
