import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import "../styling/ProfilePage.scss";
import { ThemeContext } from "../context/ThemeContextProvider";
import {BsImages} from "react-icons/bs"
import {FiUpload} from "react-icons/fi"
import client from "../react-query-client"
// 



Testing dev branch





// 
const ProfilePage = () => {
  const { authTokens, callLogout, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext)

  const [file,  setFile] = useState(null)
  const [previewImage,  setpreviewImage] = useState(null)

  const handleChange = (e) =>{
    setpreviewImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  let onInputClick = (event) => { event.target.value = '' }

  const getInfo = (url, body) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(body),
    });

  const postMedia = (url) => {
    const formData = new FormData();
    formData.append("gallery", file )
    fetch(url, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + String(authTokens.access),},
      body: formData,
    });
  }

  const { data: userinfos, isLoading, isError,} = useQuery(["userinfos"],() => {
      return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());}, { enabled: !loading }
  );

  const mutation = useMutation(
    (body) => postMedia("http://127.0.0.1:8000/userinfo/", body),
    { onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("userinfos");
        setpreviewImage(null);
        setFile(null);
      }, onError(error) { console.log("Got error from backend", error);},
    }
  );

  function callMutation() { mutation.mutate({ usermedia: file });}

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error with request</h1>;
  if (userinfos.code === "token_not_valid") return callLogout();

  console.log(userinfos[0].usermedia)

  return (
    <div>
      <div className={`Profile_container_${theme}`}>
        <div className={`Profile_container-user_nav_${theme}`}>
          <Navbar />
          {userinfos?.map((userinfo) => (
            <div key={userinfo.user} className="user-userinfo">
              <div className="user_profile_picture-container">
                <img src={`http://127.0.0.1:8000/${userinfo.picture}`} alt={userinfo.user} width="500" height="600" />
              </div>
              <div className="user_profile_picture-userinfo">
                <h1> {userinfo.user.first_name} {userinfo.user.last_name}</h1>
                <p>@{userinfo.user.username}</p>
                <i>{userinfo.profession}</i>
              </div>
            </div>))}
        </div>
          <div className={`user_profile_picture-userinfo_fp_${theme}`}>
            <p> <strong>10.3M</strong> followers</p>
            <p> <strong>252</strong> posts</p>
            <p> <strong>496</strong> following</p>
          </div>
      </div>
      <div className={`Profiepage_user-media_container_${theme}`}>
          {userinfos[0].usermedia.map((images) => (
            <div key={images.id} className="Profilepage_user-image_container">
              <img src={`http://127.0.0.1:8000/${images.gallery}`} alt="" />
            </div>
          ))}
          { file &&             
          <div className="Profilepage_user-image_container uploading">
            <img src={previewImage} alt="" />
            <div className="Profilepage_image-uploader_button">
              <button onClick={() => setFile(null)}>Cancel</button>
              <button onClick={callMutation}>Upload <FiUpload/> </button>
            </div>
          </div> }
          <div className="Profilepage_user-image_uploader">
            <label htmlFor="file-input"> <BsImages  size="50px"/></label>
            <input id="file-input" type="file" onChange={handleChange} onClick={onInputClick} style={{display: "none"}}/>
            <p>Upload Image</p>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;
