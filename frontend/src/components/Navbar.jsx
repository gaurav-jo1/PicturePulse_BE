import React,{useState, useContext} from "react";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Instagram_logo from "../assets/Instagram_logo_light.webp";

import { GrHomeRounded } from "react-icons/gr";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";

import "../styling/Navbar.scss";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { authTokens, callLogout, loading } = useContext(AuthContext)
  const [searchValue, setSearchValue] = useState("")

  const getInfo = (url, body) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authTokens.access),
    },
    body: JSON.stringify(body),
  });

const {
  data: userinfos,
  isLoading,
  isError,
} = useQuery(
  ["userinfos"],
  () => {
    return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());
  },
  { enabled: !loading }
);

if (isLoading) return <h1>Loading....</h1>;

if (isError) return <h1>Error with request</h1>;

if (userinfos.code === "token_not_valid") return callLogout();

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
          <li> <Link to="/"> <IoPaperPlaneOutline /> </Link> </li>
          <li> <Link to="/"> <CgAddR /> </Link> </li>
          <li> <Link to="/"> <BsHeart /> </Link> </li>
          {
            userinfos?.map((userinfo) => (
              <li key={userinfo.user}> <Link to="/profile"> <img src={`http://127.0.0.1:8000/${userinfo.picture}`}alt={userinfo.user} width="30" height="30"/> </Link> </li>
            ))
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
