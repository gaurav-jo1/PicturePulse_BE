import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../context/ThemeContextProvider";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {BsThreeDots,BsHeart,BsHeartFill} from "react-icons/bs"
import {TbMessageCircle2} from "react-icons/tb"
import {IoIosShareAlt} from "react-icons/io"
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.webp";
import {users} from "./profileInfo"


import "../styling/HomePage.scss";



const HomePage = () => {
  const { authTokens,callLogout} = useContext(AuthContext);

  const [like, setLike] = useState(false)

  const toggleLike = () => {
    setLike((curr) => (curr === false ? true : false))
  }

  const { theme } = useContext(ThemeContext);

  const { data: userinfos, error, status  } = useQuery(["userinfos"], () => {
    return fetch('http://127.0.0.1:8000/userinfo/', {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      }
    }).then(response => response.json())
  });

  if (status === 'loading') return <LoadingScreen />

  if (status === 'error') return <p>Error: {error.message}</p>

  if (userinfos.code === "token_not_valid") return callLogout();
 
  return (
    <div className={`Home_container_${theme}`}>
      <div className="Home_container_navbar-container">
        <Navbar />
      </div>
      <div className="HomePage_container_div">
      <div className="HomePage_container-media">
        {users.map((user) => (
              <div key={user.name} className={`HomePage_container_Images-container_${theme}`}>
                <div className="HomePage_container_Images-user">
                  <div className="HomePage_container_Images-user_profile-container">
                    <div className="HomePage_container_Images-user_profile">
                      <img src={user.profilepics} alt="profile pic" />
                    </div>
                    <div className="HomePage_container_Images-user_username">
                      <p>{user.name}</p>
                      <p>{user.time}</p>
                    </div>
                  </div>
                  <div className="HomePage_container_Images-user_threedot">
                    <p><BsThreeDots/></p>
                  </div>
                </div>
                <div className="HomePage_container_Images-img">
                  <img src={user.image} alt="images" />
                </div>
                <div className="HomePage_container_Images-reaction">
                  <ul>
                    <div className="HomePage_container_image_react_icons">
                      <li> {like ? <BsHeartFill style={{color: 'red', }}  onClick={() => toggleLike()}/> : < BsHeart  onClick={() => toggleLike()}/>} &nbsp; <span>{user.likes}</span></li>
                      <li><TbMessageCircle2/>&nbsp;<span>25</span></li>
                    </div>
                    <li><IoIosShareAlt/></li>
                  </ul>
                </div>
              </div> ))
        }
        </div>

        {userinfos?.map((userinfo) => (
            <div key={userinfo.id} className={`HomePage_container_Profile-container_${theme}`}>
              <div className="HomePage_container_Profile_image-container">
                <div className="HomePage_container_Profile_image">
                  {userinfo.picture ? (
                    <img src={`http://127.0.0.1:8000/${userinfo.picture}`} alt={userinfo.user} width="70" height="70"/>
                  ) : (
                    <img src={no_profile} alt="no profile" width="60" height="60"/>
                  )}
                </div>
                <div className="HomePage_container_Profile_username">
                  <h4>{userinfo.user.first_name}</h4>
                  <p>@{userinfo.user.username}</p>
                </div>
              </div>
              <div className="HomePage_container_Profile_bio-container">
                <p><Link to="/profile"><strong>View Profile</strong></Link></p>
              </div>
            </div>)
        )}
      </div>
      <div className="Home_container_footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
