import React, { useContext } from "react";
import ReactSwitch from "react-switch";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { ThemeContext } from "../context/ThemeContextProvider";
import "../styling/Header.scss"

const Header = () => {
    const {theme} = useContext(ThemeContext)
    const {toggleTheme} = useContext(ThemeContext)
  return (
        <ReactSwitch className="React_Switch" onChange={toggleTheme} checked={theme === "dark"} checkedIcon={<BsMoonFill/>} uncheckedIcon={<BsFillSunFill className='sun_svg'/>}/>
  )
}


export default Header;