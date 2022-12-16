import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditPage from "./pages/EditPage";
import RequireAuth from "./utils/RequireAuth";
import ThemeContextProvider from "./context/ThemeContextProvider";
import AuthProvider from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <ThemeContextProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/Edit" element={<EditPage />} />
              <Route exact path="/loading" element={<LoadingScreen />} />
              <Route exact path="/Chat" element={<ChatPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </ThemeContextProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
