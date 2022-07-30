import React from "react";

import Instagram_logo from "../../assets/Instagram_logo.webp";

import { GrHomeRounded } from "react-icons/gr";
import {IoPaperPlaneOutline} from 'react-icons/io5'
import {BsCircle, BsHeart} from 'react-icons/bs'
import {CgAddR} from 'react-icons/cg'
import {HiSearch} from 'react-icons/hi'

import "./Navbar.scss";

const Navbar = () => {
  return (
    <navigator>
      <div className="Navbar_container">
        <div className="Navbar_container-Box1">
          <div className="Navbar_container-Box1-logo">
            <img src={Instagram_logo} alt="Instagram_logo" />
          </div>
        </div>
        <div className="Navbar_container-Box2">
          <div className="Navbar_container-Box2-search">
            <span><HiSearch/></span>
            <input type="text" placeholder="     Search" />
          </div>
        </div>
        <div className="Navbar_container-Box3">
          <ul className="Navbar_container-Box3-icons">
            <li> <a href="/"><GrHomeRounded /></a>  </li>
            <li> <a href="/"><IoPaperPlaneOutline/> </a></li>
            <li> <a href="/"><CgAddR/> </a></li>
            <li> <a href="/"><BsHeart /></a>  </li>
            <li> <a href="/"><BsCircle/></a> </li>
          </ul>
        </div>
      </div>
    </navigator>
  );
};

export default Navbar;
