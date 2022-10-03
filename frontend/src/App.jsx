import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ThemeContextProvider from "./context/ThemeContextProvider";

const App = () => {
  return (
    <div className="app">
      <ThemeContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
