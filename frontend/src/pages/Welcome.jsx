import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
// import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContextProvider";
import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.webp";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import "../styling/Welcome.scss";

const Welcome = () => {
  const { theme } = useContext(ThemeContext);
  const { authTokens, callLogout } = useContext(AuthContext);

  const {
    data: userinfos,
    error,
    status,
  } = useQuery(["userinfos"], () => {
    return fetch("http://127.0.0.1:8000/userinfo/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    }).then((response) => response.json());
  });

  if (status === "loading") return <LoadingScreen />;

  if (status === "error") return <p>Error: {error.message}</p>;

  if (userinfos.code === "token_not_valid") return callLogout();

  return (
    <div className={`Welcome_container_${theme}`}>
      <div className="Welcome_container_navbar-container">
        <Navbar />
      </div>
      <div className="Welcome_text-container">
        <div className="Welcome_text-container_h1">
          <h1>
            <span>Welcome</span> <span>to</span> <span>Instagram!</span>
          </h1>
        </div>
        <div className="Welcome_text-container_p">
          <p>
            Ready to share your own moments? Simply snap a photo, and share it
            with your followers
          </p>
        </div>

        <div className="Welcome_profile-container">
          {userinfos?.map((userinfo) => (
            <div className={`Welcomepage-container_${theme}`} key={userinfo.id}>
              <div className="Welcome_container_Profile_image-container">
                <div className="Welcome_container_Profile_image">
                  {userinfo.picture ? (
                    <img
                      src={`http://127.0.0.1:8000/${userinfo.picture}`}
                      alt={userinfo.user}
                      width="75"
                      height="75"
                    />
                  ) : (
                    <img
                      src={no_profile}
                      alt="no profile"
                      width="60"
                      height="60"
                    />
                  )}
                </div>
                <div className="Welcome_container_Profile_username">
                  <h4>{userinfo.user.first_name}</h4>
                  <h5>@{userinfo.user.username}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="Welcome_view_profile-button">
            <Link to="/profile">
            <button>
                <strong>View Profile</strong>
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
