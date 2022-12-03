import React, { useContext } from "react";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../context/ThemeContextProvider";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.png";
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
  // const { data: images } = useQuery(["googleImages"], () => {
  //   return axios.get("https://serpapi.com/playground?q=Apple").then((t) => t.json());
  // });

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`Home_container_${theme}`}>
      <div className="Home_container_navbar-container">
        <Navbar />
      </div>
      <div className="HomePage_container_div">
        <div className="HomePage_container_Images-container">
          <div className="HomePage_container_Images-user">
            <div className="HomePage_container_Images-user_profile">
              <img src="" alt="" />
            </div>
            <div className="HomePage_container_Images-user_username">
              <p>Gaurav Joshi</p>
            </div>
          </div>
          <div className="HomePage_container_Images-img">
            <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
          </div>
          <div className="HomePage_container_Images-reaction">
            <ul>
              <li>like</li>
              <li>Date</li>
              <li>share</li>
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
                  <img src={no_profile} alt="no profile" width="30" height="30"/>
                )}
              </div>
              <div className="HomePage_container_Profile_username">
                <h4>{userinfo.user.first_name}</h4>
                <p>@{userinfo.user.username}</p>
              </div>
            </div>
            <div className="HomePage_container_Profile_bio-container">
              <p>{userinfo.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
