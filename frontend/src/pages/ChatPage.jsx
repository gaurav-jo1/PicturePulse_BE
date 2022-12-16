import React, { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContextProvider";

import "../styling/ChatPage.scss";

const ChatPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`ChatPage_container_${theme}`}>
      <div className="ChatPage_container-navbar">
        <Navbar />
      </div>
      <div className="ChatPage_container-div">
        <h1>Hellow World</h1>
      </div>
      <div className="ChatPage_container-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ChatPage;
