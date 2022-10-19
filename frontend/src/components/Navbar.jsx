import React,{useState} from "react";
import { Link } from 'react-router-dom';

import Instagram_logo from "../assets/Instagram_logo_light.webp";

import { GrHomeRounded } from "react-icons/gr";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsCircle, BsHeart } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";

import "../styling/Navbar.scss";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="Navbar_container">
      <div className="Navbar_container-Box1">
        <div className="Navbar_container-Box1-logo">
          <img src={Instagram_logo} alt="Instagram_logo" />
        </div>
      </div>
      <div className="Navbar_container-Box2">
        <div className="Navbar_container-Box2-search">
          { searchValue ? <span> <HiSearch style={{ visibility: "hidden"}} /> </span> : <span> <HiSearch /> </span>}
          <input value={searchValue} type="text" placeholder="   Search" onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
      </div>
      <div className="Navbar_container-Box3">
        <ul className="Navbar_container-Box3-icons">
          <li> <Link to="/"> <GrHomeRounded/></Link> </li>
          <li> <a href="/"> <IoPaperPlaneOutline /> </a> </li>
          <li> <a href="/"> <CgAddR /> </a> </li>
          <li> <a href="/"> <BsHeart /> </a> </li>
          <li> <Link to="/profile"> <BsCircle /> </Link> </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
