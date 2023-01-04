import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import "../styling/ProfilePage.scss";
import { ThemeContext } from "../context/ThemeContextProvider";
import { Link } from "react-router-dom";
import { FiUpload,FiEdit, } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import no_profile from "../assets/35-The-Beauty-of-Anya-Forger.webp";
import axios from "axios";
import client from "../react-query-client";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { authTokens, loading,callLogout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState(null);
  const [previewImage, setpreviewImage] = useState(null);

  const handleChange = (e) => {
    setpreviewImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  let onInputClick = (event) => {
    event.target.value = "";
  };

  const { data: userinfos, isLoading, isError,} = useQuery( ["userinfos"],() => {
      return fetch('http://127.0.0.1:8000/userinfo/', {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        }
      }).then(response => response.json())
    }, { enabled: !loading }
  );
  

  const { data: usermedia } = useQuery( ["usermedia"],() => {
    return fetch('http://127.0.0.1:8000/usermedia/', {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      }
    }).then(response => response.json())
    },{ enabled: !loading }
  );

  function callMutation() {
    const formData = new FormData();
    formData.append("gallery", file);
    axios.post("http://127.0.0.1:8000/usermedia/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          console.log("Invalidate Query called")
          client.invalidateQueries(["usermedia"]);
          setpreviewImage(null);
          setFile(null);
        }
      });
  }
 
  if (isLoading) return <LoadingScreen />;
  if (isError) return <h1>Error with request</h1>;
  if (userinfos.code === "token_not_valid") return callLogout();

  return (
    <div className={`Profile_container_${theme}`}>
        <div className={`Profile_container-user_nav_${theme}`}>
          <Navbar />
          <div className="user-userinfo">
            {( userinfos?.map((userinfo) => (
                <div key={userinfo.user} className="user_profile_picture-container">
                  {userinfo.picture ? <img src={`http://127.0.0.1:8000${userinfo.picture}`} alt={userinfo.user} width="500" height="600" /> : <img src={no_profile} alt="noprofile" width="500" height="600" /> }
                </div>
              )))}
          </div>
        </div>
        <div className={`user_profile_picture-userinfo_fp_${theme}`}>
          {userinfos?.map((userinfo) => (
            <div key={userinfo.user} className="user_profile_picture-userinfo">
              <Link className="user_profile-edit_small" to="/Edit">
                <div className={`user_userinfo-edit_small_${theme}`}>
                    <p>Edit Profile&nbsp;</p>
                    <p> <FiEdit /></p>
                </div>
              </Link>
              <h1> {userinfo.user.first_name} </h1>
              <p>@{userinfo.user.username}</p>
              <i>{userinfo.profession}</i>
              <Link className="user_profile-edit_big" to="/Edit">
                <div className={`user_userinfo-edit_${theme}`}>
                    <p>Edit Profile&nbsp;</p>
                    <p> <FiEdit /></p>
                </div>
              </Link>
            </div>
          ))}
          <div className={`user_profile_picture-userinfo-follower_${theme}`}>
            <span><strong>10.3M</strong> <p>&nbsp;Followers</p></span>
            <span><strong>252</strong> <p>&nbsp;Posts</p></span>
            <span><strong>496</strong> <p>&nbsp;Following</p></span>
          </div>
        </div>
      <div className={`Profiepage_user-media_container_${theme}`}>
        {usermedia?.map((images) => (
            <div key={images.id} className="Profilepage_user-image_container">
              <img src={`http://127.0.0.1:8000${images.gallery}`} alt="" />
            </div>
          )).reverse()}
        {file && (
          <div className="Profilepage_user_image_upload-container">
            <img src={previewImage} alt="" />
            <div className="Profilepage_image-uploader_button">
              <button onClick={() => setFile(null)}>Cancel</button>
              <button onClick={callMutation}>
                Upload <FiUpload />
              </button>
            </div>
          </div>
        )}
        <div className="Profilepage_user-image_uploader">
          <label htmlFor="file-input">
            <FaCloudUploadAlt size="60px" />
          </label>
          <input id="file-input" type="file" onChange={handleChange} onClick={onInputClick} style={{ display: "none" }}/>
          <p>Upload Image</p>
        </div>
      </div>
      <div className="ProfilePage_container_footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
