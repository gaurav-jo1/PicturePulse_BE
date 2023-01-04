import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import { ThemeContext } from "../context/ThemeContextProvider";
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
            <span>Welcome &nbsp;to&nbsp; </span><span>Instagram!</span>
          </h1>
        </div>
        <div className="Welcome_text-container_h2">
          {userinfos?.map((userinfo) => (
            <h2 key={userinfo.id}>{userinfo.user.first_name}</h2>
          ))}
        </div>

        <div className="Welcome_view_profile-button">
          <Link to="/profile">
            <button>
              <strong>View Profile</strong>
            </button>
          </Link>
        </div>
        <div className="Welcome_text-container_p">
          <p>
            Ready to share your own moments? Simply snap a photo, and share it
            with your followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
