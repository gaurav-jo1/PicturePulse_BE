import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import "../styling/HomePage.scss";

const HomePage = () => {
  const { user, authTokens } = useContext(AuthContext);

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
  } = useQuery(["notes"], () => {
    return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());
  });

  if (isLoading) return <h1>Loading....</h1>;

  if (isError) return <h1>Error with request</h1>;

  console.log(userinfos);

  return (
    <div>
      <Navbar />
      <div className="HomePage_container">
        {userinfos?.map((userinfo) => (
          <div  key={userinfo.user} >
            <div className="user_profile_picture-container">
              <img src={`http://127.0.0.1:8000/${userinfo.picture}`} alt={userinfo.user} width="500" height="600" />
            </div>
            <div className="user_profile_picture-userinfo">
              <h1>@{userinfo.user.username}</h1>
              <p>{userinfo.user.first_name} {userinfo.user.last_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
