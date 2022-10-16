import React,{useState} from "react";
import { useParams } from 'react-router-dom';

import Instagram_logo from "../assets/Instagram_logo_light.webp";

import { GrHomeRounded } from "react-icons/gr";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsCircle, BsHeart } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import {AiFillHome} from "react-icons/ai"

import "../styling/Navbar.scss";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("")
  let { userId } = useParams();
  
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
          <input value={searchValue} type="text" placeholder="     Search" onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
      </div>
      <div className="Navbar_container-Box3">
        <ul className="Navbar_container-Box3-icons">
          <li> <a href="/"> {userId ? <GrHomeRounded/> :<AiFillHome /> } </a> </li>
          <li> <a href="/"> <IoPaperPlaneOutline /> </a> </li>
          <li> <a href="/"> <CgAddR /> </a> </li>
          <li> <a href="/"> <BsHeart /> </a> </li>
          <li> <a href="/"> <BsCircle /> </a> </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
