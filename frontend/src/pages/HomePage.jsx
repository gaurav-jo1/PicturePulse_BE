import React,{useContext} from "react";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContextProvider";
import "../styling/HomePage.scss";

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Home_container_${theme}`}>
      <Navbar />
      <div className="HomePage_container_div">
        <h1>Homepage</h1>
        <h1>Homepage</h1>
        <h1>Homepage</h1>
      </div>
    </div>
  );
};

export default HomePage;
