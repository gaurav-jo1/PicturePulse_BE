import React, {useContext} from "react";
import Navbar from "../components/Navbar";
import {AuthContext} from "../context/AuthContext"
import "../styling/HomePage.scss";

const HomePage = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Navbar />
      <div className="HomePage_container">
      <h1>HomePage</h1>
      <h1>Hellow {user.username}</h1>
      </div>
    </div>
  );
};

export default HomePage;
