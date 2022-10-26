import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import "../styling/ProfilePage.scss";

const ProfilePage = () => {
  const { authTokens, callLogout, loading } = useContext(AuthContext);

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

  console.log(userinfos);

  return (
    <div>
      <Navbar />
      <div className="Profile_container">
        {userinfos?.map((userinfo) => (
          <div key={userinfo.user} className="user-userinfo">
            <div className="user_profile_picture-container">
              <img
                src={`http://127.0.0.1:8000/${userinfo.picture}`}
                alt={userinfo.user}
                width="500"
                height="600"
              />
            </div>
            <div className="user_profile_picture-userinfo">
              <h1>
                {userinfo.user.first_name} {userinfo.user.last_name}
              </h1>
              <p>@{userinfo.user.username}</p>
              <i>{userinfo.profession}</i>
            </div>
          </div>
        ))}
        <div className="user_profile_picture-userinfo_fp">
          <p>10.3M followers</p>
          <p>252 posts</p>
          <p>496 following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
