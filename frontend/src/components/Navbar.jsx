import React, { useState, useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Insta_logo_light from "../assets/Instagram_logo_light.webp";
import Insta_logo_dark from "../assets/Instagram_logo_dark.webp";
import Header from "./Header";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import {BiHomeHeart} from "react-icons/bi"
import {FiLogOut} from "react-icons/fi"
import { CgAddR } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.webp"
import "../styling/Navbar.scss";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContextProvider";


const Navbar = () => {
  const { authTokens, loading, callLogout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext)
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate()

  const getInfo = (url, body) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(body),
    });

  const { data: userinfos, isLoading, isError,} = useQuery(["userinfos"],() =>
    { return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());}
    , { enabled: !loading }
  );

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error with request</h1>;

  return (
    <div className="Navbar_container">
      <div className="Navbar_container-Box1">
        <div className="Navbar_container-Box1-logo">
          <Link to="/">
            {theme === "light"
            ? (<img src={Insta_logo_light} alt="Instagram" />)
            : (<img src={Insta_logo_dark} alt="Instagram" />)}
          </Link>
        </div>
      </div>
      <div className="Navbar_container-Box2">
        <div className="Navbar_container-Box2-search">
          <label><HiSearch/></label>
          <input value={searchValue} type="text" onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
      </div>
      <div className="Navbar_container-Box3">
        <ul className={`Navbar_container-Box3-icons_${theme}`}>
          <li> <Link to="/"> <BiHomeHeart /> </Link> </li>
          <li> <Link to="/"> <IoPaperPlaneOutline /> </Link> </li>
          <li> <Link to="/"> <CgAddR /> </Link> </li>
          <li> <Link to="/"> <BsHeart /> </Link> </li>
          {userinfos && userinfos?.map((userinfo) => (
            <li className="Navbar_profile_logout" key={userinfo.user}>
                {userinfo.picture ? <img onClick={() => navigate("/profile")} src={`http://127.0.0.1:8000${userinfo.picture}`} alt={userinfo.user} width="30" height="30"/> :<img onClick={() => navigate("/profile")} src={no_profile} alt="no profile" width="30" height="30"/>}
              <ul>
                <span className="triangle"></span>
                <li onClick={() => callLogout()}>Logout <FiLogOut/> </li>
              </ul>
            </li>
          )) }
          <li> <Header /> </li>
        </ul>
        <ul className={`Navbar_container-Box3-icons_two_${theme}`}>
          {userinfos && userinfos?.map((userinfo) => (
            <li className="Navbar_profile_logout" key={userinfo.user}>
                {userinfo.picture ? <img onClick={() => navigate("/profile")} src={`http://127.0.0.1:8000${userinfo.picture}`} alt={userinfo.user} width="35" height="35"/> :<img src={no_profile} onClick={() => navigate("/profile")} alt="no profile" width="35" height="35"/>}
              <ul>
                <span className="triangle"></span>
                <li onClick={() => callLogout()}>Logout <FiLogOut/> </li>
              </ul>
            </li>
          )) }
          <li> <Header /> </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
