import React from "react";
import Navbar from "../components/Navbar";
import "../styling/HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="Home_container">
        <h1>Homepage</h1>
      </div>
    </div>
  );
};

export default HomePage;
