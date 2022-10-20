import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import "../styling/Profile.scss";

const ProfilePage = () => {
  const { userinfos } = useContext(AuthContext);

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
              <h1>@{userinfo.user.username}</h1>
              <p>
                {userinfo.user.first_name} {userinfo.user.last_name}
              </p>
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
