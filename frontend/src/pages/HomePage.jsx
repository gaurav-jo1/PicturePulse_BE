import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../context/ThemeContextProvider";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {BsThreeDots,BsHeart,BsHeartFill} from "react-icons/bs"
import {TbMessageCircle2} from "react-icons/tb"
import {IoIosShareAlt} from "react-icons/io"
import Navbar from "../components/Navbar";
import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.png";
import girl from "../assets/istockphoto-1220780604-612x612.jpg"
import "../styling/HomePage.scss";

const HomePage = () => {
  const { authTokens } = useContext(AuthContext);

  const getInfo = (url, body) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      }, body: JSON.stringify(body),
    });

  const { data: userinfos } = useQuery(["userinfos"], () => {
    return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());
  });

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`Home_container_${theme}`}>
      <div className="Home_container_navbar-container">
        <Navbar />
      </div>
      <div className="HomePage_container_div">
        <div className="HomePage_container_Images-container">
          <div className="HomePage_container_Images-user">
            <div className="HomePage_container_Images-user_profile-container">
              <div className="HomePage_container_Images-user_profile">
                <img src={girl} alt="girl"  width="40" height="40"/>
              </div>
              <div className="HomePage_container_Images-user_username">
                <p>Gaurav Joshi</p>
                <p>10 min ago</p>
              </div>
            </div>
            <div className="HomePage_container_Images-user_threedot">
              <p><BsThreeDots/></p>
            </div>
          </div>
          <div className="HomePage_container_Images-img">
            <img src="https://picsum.photos/seed/picsum/700/400" alt="" />
          </div>
          <div className="HomePage_container_Images-reaction">
            <ul>
              <div className="HomePage_container_image_react_icons">
                <li><BsHeart/></li>
                <li><TbMessageCircle2/></li>
              </div>
              <li><IoIosShareAlt/></li>
            </ul>
          </div>
        </div>

        {userinfos?.map((userinfo) => (
          <div key={userinfo.id} className="HomePage_container_Profile-container">
            <div className="HomePage_container_Profile_image-container">
              <div className="HomePage_container_Profile_image">
                {userinfo.picture ? (
                  <img src={`http://127.0.0.1:8000/${userinfo.picture}`} alt={userinfo.user} width="60" height="60"/>
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
              <p>{userinfo.profession}</p>
              <p><Link to="/profile"><strong>View Profile</strong></Link></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
